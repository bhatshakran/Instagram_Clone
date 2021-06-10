const express = require("express");
const app = express();
const connectDB = require("./config/db");

// Connect Database
connectDB();

app.get("/", (req, res) => {
  res.send("Home page");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
