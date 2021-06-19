const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  bio: {
    type: String,
  },
  username: {
    type: String,
  },
  website: {
    type: String,
  },
  phone: {
    type: Number,
  },
  gender: {
    type: String,
  },
  profilepic: {
    type: String,
  },
  followers: [
    {
      user: {
        type: ObjectId,
        ref: "user",
      },
    },
  ],
  following: [
    {
      user: {
        type: ObjectId,
        ref: "user",
      },
    },
  ],
});

module.exports = User = mongoose.model("user", userSchema);
