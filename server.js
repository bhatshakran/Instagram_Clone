var compression = require("compression");
const express = require("express");
const app = express();
const connectDB = require("./config/db");
const path = require("path");

// Connect Database
connectDB();

// Init Middleware
app.use(compression(
 { level: 6,
  threshold:0,
  filter: (req, res) => {
    if(req.headers['x-no-compression']){
      return false
    }
    return compression.filter(req,res)

  }
 }
));
app.use(
  express.json({
    extended: false,
  })
);
// Register user routing
app.use("/api/users", require("./routes/api/users"));
// Auth routing
app.use("/api/auth", require("./routes/api/auth"));
// Posts routing
app.use("/api/posts", require("./routes/api/posts"));

// Serve static assets in production

if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(
      path.resolve(process.env.PWD, "client", "build", "index.html")
    );
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log("Server is runnning on port " + PORT));
