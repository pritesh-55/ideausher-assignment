const Post = require("../models/Post");
const Tag = require("../models/Tag");
const { uploader } = require('../config/cloudinary');
const { customPaginator } = require('../utils/commonUtils');

exports.getAllPosts = async (req, res) => {
  try {
    const { sort = "desc", page, limit, keyword, tag } = req.query;
    const pageNum = +page || 1;
    const limitNum = +limit || 10;

    const query = {};

    // Filter by keyword (case-insensitive and Partial match)
    if (keyword) {
      query.$or = [
        { title: { $regex: keyword, $options: "i" } },
        { desc: { $regex: keyword, $options: "i" } }
      ];
    }

    // Filter by tag (case-insensitive)
    if (tag) {
      const tagDoc = await Tag.findOne({ name: { $regex: `^${tag}$`, $options: "i" } });
      if (tagDoc) {
        query.tags = tagDoc._id;
      } else {
        // Return empty results if tag not found
        return res.status(200).json({
          docs: [],
          ...customPaginator(pageNum, limitNum, 0)
        });
      }
    }
    
    // Fetch posts
    const options = {
      page: pageNum,
      limit: limitNum,
      sort: { createdAt: sort === "asc" ? 1 : -1 },
      populate: "tags"
    };
    const posts = await Post.paginate(query, options);
    
    res.status(200).json(posts);
  } catch (error) {
    res.status(error.status || 500).json({
      error: error.message || 'Unable to fetch Posts',
    });
  }
};

exports.createPost = async (req, res) => {
  try {
    const { title, desc, tags } = req.body;
    let imageUrl = null;

    // Upload Image
    if (req.file) {
      const streamUpload = (buffer) => {
        return new Promise((resolve, reject) => {
          const stream = uploader.upload_stream((error, result) => {
            if (result) return resolve(result);
            reject(error);
          });
          stream.end(buffer);
        });
      };

      const result = await streamUpload(req.file.buffer);
      imageUrl = result.secure_url;
    }

    if(!imageUrl && !title){
      throw Object.assign(new Error('Either provide image or Post title to create post'), {
        status: 400,
      });
    }

    // Handle tags
    const tagArray = Array.isArray(tags) ? tags : [tags];
    const tagDocs = await Tag.find({ name: { $in: tagArray || [] } });

    // Create post
    const post = new Post({ title, desc, image: imageUrl, tags: tagDocs.map(t => t._id) });
    await post.save();

    res.status(201).json(post);
  } catch (error) {
    res.status(error.status || 500).json({
      error: error.message || 'Unable to create Post',
    });
  }
};
