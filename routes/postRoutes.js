const express = require("express");
const multer = require("multer");
const router = express.Router();
const upload = multer({ dest: "uploads/" });

// Middlewares
const schemaValidator = require("../utils/schemaValidator");
const { createPostBodySchema, getPostsQuerySchema } = require("../schema/postSchema"); // Validation Schemas
const validateImage = require("../utils/validateImage");

// Controller
const postController = require("../controllers/postController");

/**
 * @swagger
 * /api/posts:
 *   get:
 *     summary: Get all posts with optional filters
 *     parameters:
 *       - in: query
 *         name: keyword
 *         description: Filter posts by keyword search in title or description
 *         required: false
 *         schema:
 *           type: string
 *       - in: query
 *         name: tag
 *         description: Filter posts by tag name
 *         required: false
 *         schema:
 *           type: string
 *       - in: query
 *         name: sort
 *         description: Sort posts by creation date (asc or desc)
 *         required: false
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *       - in: query
 *         name: page
 *         description: Page number for pagination
 *         required: false
 *         schema:
 *           type: integer
 *       - in: query
 *         name: limit
 *         description: Number of posts per page
 *         required: false
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Paginated list of posts
 *
 *   post:
 *     summary: Create a new post
 *     consumes:
 *       - multipart/form-data
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: The title of the post
 *               desc:
 *                 type: string
 *                 description: The description/content of the post
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: Image file to upload (optional)
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *                   description: An array of tag names (max 5 tags)
 *     responses:
 *       201:
 *         description: Post created successfully
 *       400:
 *         description: Bad request
 */
router.get(
  "/",
  schemaValidator({ query: getPostsQuerySchema }),
  postController.getAllPosts
);
router.post(
  "/",
  upload.single("image"),
  validateImage,
  schemaValidator({ body: createPostBodySchema }),
  postController.createPost
);

module.exports = router;
