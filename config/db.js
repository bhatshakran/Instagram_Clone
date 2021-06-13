const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const mongoURI = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.1tc8t.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

// 8LSO18Oh2G3gE0qU
const connectDB = async () => {
  try {
    await mongoose.connect(mongoURI, {
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
