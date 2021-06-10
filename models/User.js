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
    type: password,
    required: true,
  },
});

module.exports = User = mongoose.model("User", userSchema);
