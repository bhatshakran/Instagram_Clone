const express = require("express");
const router = express.Router();
const bcrypt = require('bcryptjs')
const { check, validationResult } = require("express-validator");
const User = require("../../models/User");

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


    //   Check if user exists with that email
      try {
        let user = await User.findOne({ email })
        if (user) {
          return res
            .status(400)
            .json({ errors: [{ msg: "User already exists with that email" }] })
        }
        // Create new user with that email
        user = new User({
          name,
          email,
          password,
          profilepic,
          username,
          website,
          bio,
          phone,
          gender,
        });

        // We dont want plain text passwords
        // So we will hash them using bcrypt
        
        const salt = await bcrypt.genSalt(10)

        user.password = await bcrypt.hash(password, salt)

        await user.save()

        res.status(200).json({"message":"User registered"});



        






      } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
      }
    }
  }
);

module.exports = router;
