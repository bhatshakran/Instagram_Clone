const express = require("express");
const app = express();
const connectDB = require("./config/db");

// Connect Database
connectDB();

// Init Middleware
app.use(express.json({
    extended: false
}))
// Register user routing
app.use("/api/users", require("./routes/api/users"));
// Auth routing
app.use("/api/auth", require("./routes/api/auth"));
// Posts routing
app.use("/api/posts", require("./routes/api/posts"));

app.get("/", (req, res) => {
    res.send("Home page");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});