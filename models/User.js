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
      id: {
        type: ObjectId,
        ref: "user",
      },
      name: {
        type: String,
      },
    },
  ],
  following: [
    {
      id: {
        type: ObjectId,
        ref: "user",
      },
      name: {
        type: String,
      },
    },
  ],
});

module.exports = User = mongoose.model("user", userSchema);
