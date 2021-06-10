const express = require("express");
const app = express();
const connectDB = require("./config/db");

// Connect Database
connectDB();

// Init Middleware
app.use(express.json({
    extended: false
}))

app.use("/api/users", require("./routes/api/users"));

app.get("/", (req, res) => {
    res.send("Home page");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});