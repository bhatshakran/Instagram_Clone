const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const { check, validationResult } = require("express-validator");
const User = require("../../models/User");

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

    let user = await User.findOne({ email })
    // Check if user exists
    if(!user){
      return res.status(400).json({errors:[{
        msg:'Invalid Credentials!'
      }]})
    }

    const isMatch = await bcrypt.compare(password, user.password)
    // Check if password is correct
    if(!isMatch){
      return res.status(400).json({errors:[{
        msg:'Invalid Credentials!'
      }]})
    }

    res.status(200).json({msg:'Signin successfull!'})


    
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }

});

module.exports = router;
