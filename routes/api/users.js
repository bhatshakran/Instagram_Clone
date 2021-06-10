const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");

// @route POST api/users
//  @desc Register User
// @access public

router.post(
  "/",
  [
    check("name", "Name is required").not().isEmpty(),
    check("email", "Please enter a valid email").isEmail(),
    check(
      "password",
      "Please enter a password with 6 or more characters"
    ).isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ Errors: errors.array() });
    } else {
      const { name, email, password } = req.body;
      try {
        res.json({ name, email, password });
      } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
      }
    }
  }
);

module.exports = router;
