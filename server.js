const express = require("express");
const app = express();
const connectDB = require("./config/db");
const path = require("path");

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

// Serve static assets
if(process.env.NODE_ENV === 'production'){
  // Set static folder
  app.user(express.static('client/build'))

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })

}



const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});