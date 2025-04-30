const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const postSchema = new mongoose.Schema({
  title: String,
  desc: String,
  image: String,
  tags: [{ type: mongoose.Schema.Types.ObjectId, ref: "Tag" }]
}, { timestamps: true });

postSchema.plugin(mongoosePaginate);

module.exports = mongoose.model("Post", postSchema);
