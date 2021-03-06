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

// @route GET api/auth/currentuser
// @desc Get current user
// @access Private
router.get('/currentuser', auth, async(req, res) =>{
  try {
    let user = await User.findById(req.user.id).select("-password");
    res.json(user)
    
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
})

// @route GET api/auth/user/:id
// @desc Get targeted user
// @access Private
router.get('/user/:id', auth, async(req, res) =>{
  try {
    let user = await User.findById(req.params.id).select("-password");
    res.send(user);
    
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
})




// @route GET api/auth/followers/:id
// @desc Get a users followers
// @access Private
router.get('/followers/:id', auth, async(req, res) => {
  try {
    let user = await User.findById(req.params.id);

    res.json(user.followers)
    
  } catch (err) {
    console.error(err.message)
    console.log('Server Error')
  }
})





// @route GET api/auth/following/:id
// @desc Get a users following
// @access Private
router.get('/following/:id', auth, async (req, res) => {
  try {
    let user = await User.findById(req.params.id);
    

    res.json(user.following)

    
  } catch (err) {
    console.error(err.message)
    console.log('Server Error')
  }
})

// @route GET api/auth/follow/:id
// @desc Follow a user
// @access Private
router.put('/follow/:id', auth, async(req, res) => {
  try {
    let user = await User.findById(req.params.id).select("-password, -email");

    // Check if the current user follows the targeted user or not
    if (
      user.followers.filter(
        (follower) => follower.user.toString() === req.user.id
      ).length > 0
    ) {
      return res.status(400).json("You already follow the user!");
    }
    const newFollower = {
      name: req.body.name,
      id: req.user.id,
    };
    user.followers.unshift(newFollower);

    await user.save();

    // Add the user to be followed to the current users following
    let currentuser = await User.findById(req.user.id);

    // Check if the current user has got the targeted user in his/her following
    if (
      currentuser.following.filter(
        (following) => following._id.toString() === user._id.toString()
      ).length > 0
    ) {
      return res.status(400).json("You already follow the user!");
    }

    currentuser.following.unshift(user);

    await currentuser.save();

    res.json({
      followers: user.followers,
      currfollowing: currentuser.following,
    });
  } catch (err) {
    console.error(err.message)
    console.log('Server Error')
  }
})


// @route GET api/auth/unfollow/:id
// @desc Unfollow a user
// @access Private
router.put('/unfollow/:id', auth, async(req, res) => {
  try {
    let user = await User.findById(req.params.id).select("-password, -email");

    // Check if the current user follows the targeted user or not
    if (
      user.followers.filter(
        (follower) => follower.id.toString() === req.user.id
      ).length === 0
    ) {
      return res.status(400).json("You do not follow the user!");
    }

    // Get remove index
    const removeIndex = user.followers
      .map((follower) => follower.id.toString())
      .indexOf(req.user.id);

    // Splice the followers
    user.followers.splice(removeIndex, 1);
    // save the user
    await user.save();

    // Remove the user  unfollowed from the current users following
    let currentuser = await User.findById(req.user.id);

    // Get remove index
    const removeIndex2 = currentuser.following
      .map((following) => following._id.toString())
      .indexOf(req.user.id);

    // Splice the following
    currentuser.following.splice(removeIndex2, 1);

    // save the user
    await currentuser.save();
    res.json({ user, currentuser });
  } catch (err) {
    console.error(err.message)
    console.log('Server Error')
  }
})

module.exports = router;
