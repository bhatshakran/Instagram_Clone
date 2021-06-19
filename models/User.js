const mongoose = require("mongoose");

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
    required: true,
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
    default: "no pic",
  },
});

module.exports = User = mongoose.model("user", userSchema);
