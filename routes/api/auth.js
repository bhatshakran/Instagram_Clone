const express = require("express");
const router = express.Router();

// @route POST api/auth
//  @desc Authenticate User
// @access public

router.post("/", (req, res) => {
  const { username, email, password } = req.body;
});

module.exports = router;
