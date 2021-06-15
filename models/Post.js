const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { ObjectId } = Schema.Types;

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },

  body: {
    type: String,
    required: true,
  },
  name: {
    type: String,
  },

  image: {
    type: String,
    required: true,
  },
  likes: {
    type: ObjectId,
    ref: "user",
  },

  postedBy: {
    type: ObjectId,
    ref: "user",
  },
});

module.exports = Post = mongoose.model("post", postSchema);
