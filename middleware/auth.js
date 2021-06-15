const jwt = require("jsonwebtoken");
// const config = require("config");
require("dotenv").config();

module.exports = function (req, res, next) {
  // Get token from header
  const token = req.header("x-auth-token");

  // Check if no token
  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }

  // Verify token
  try {
    const decoded = jwt.verify(token, process.env.jwtToken);
    if  (decoded.user)  {
      req.user = decoded.user;
    }  else  {
      req.user = decoded.id;
    }

    
    next();
  } catch (err) {
    res.status(401).json({ msg: "Token is  not valid" });
  }
};
