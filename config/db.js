const mongoose = require("mongoose");
const config = require("config");
const db = config.get("mongoURI");
// require("dotenv").config();
// const uri = process.env.mongoURI;


// 8LSO18Oh2G3gE0qU
const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected...");
  } catch (err) {
    console.error(err.message);
    //   exit the process with failure
    process.exit(1);
  }
};

module.exports = connectDB;
