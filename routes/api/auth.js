const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
// const config = require("config");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");
const User = require("../../models/User");
const auth = require("../../middleware/auth");

// @route GET api/auth
//  @desc TEST route
// @access Public

router.get("/test", auth, (req, res) => {
  res.send("You can go ahead");
});







// @route POST api/auth
//  @desc Authenticate User
// @access Public

router.post("/", 
[
  check('email', 'Please enter a valid email').isEmail(),
  check('password', 'Password is required').exists()
]
,async (req, res) => {
  const errors = validationResult(req)
  if(!errors.isEmpty()){
    return res.status(400).json({errors:errors.array()})
  }


  const {email, password} = req.body
  try {
    let user = await User.findOne({ email });

    // Check if user exists
    if (!user) {
      return res.status(400).json({
        errors: [
          {
            msg: "Invalid Credentials!",
          },
        ],
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    // Check if password is correct
    if (!isMatch) {
      return res.status(400).json({
        errors: [
          {
            msg: "Invalid Credentials!",
          },
        ],
      });
    }

    const payload = {
      user: {
        id: user.id,
      },
    };

    // Sign a token for the user

    jwt.sign(
      payload,
      `${process.env.jwtToken}`,
      { expiresIn: 360000 },
      (err, token) => {
        if (err) throw err;
        res.json({ token, user });
      }
    );
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }

});
// @route PUT api/auth/editprofile
// @desc Edit User Profile
// @access Private
router.patch('/editprofile/:id', auth, async(req, res) =>{
  try {
    let user = await User.findByIdAndUpdate(req.params.id, req.body);
    await user.save();
    res.json(await User.findById(req.params.id));
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }


})

module.exports = router;
