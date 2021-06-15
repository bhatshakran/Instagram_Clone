const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const auth = require("../../middleware/auth");
const Post = require("../../models/Post");
const User = require("../../models/User");

// @route POST api/posts
//  @desc Add a  Post
// @access Private
router.post(
  "/",
  [
    auth,
    [
      check("title", "Title is required").not().isEmpty(),
      check("body", "Body is required").not().isEmpty(),
      check("link", "Link is required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select("-password");

      const newPost = new Post({
        title: req.body.title,
        body: req.body.body,
        image: req.body.link,
        name: user.name,
        postedBy: user.id,
      });

      const post = await newPost.save();

      res.json(post);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route GET api/posts
//  @desc Get all posts
// @access Private
router.get('/', auth, async(req,res) => {
  try {
    const posts = await Post.find().sort({date:-1})
    res.json(posts)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
})


// @route GET api/posts/myposts
//  @desc Get my posts
// @access Private
router.get('/myposts', auth, async(req, res)=>{

  try {
    // console.log(req.user)
    const myposts = await Post.find({postedBy:req.user.id})
    console.log(myposts)

    res.json(myposts)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
})

// @route PUT api/posts/like/:id
//  @desc Like a post
// @access Private
router.put("/like/:id", auth, async (req, res) => {
  try {
    // Get the post first
    const post = await Post.findById(req.params.id);

    // Check if the post has been liked or not
    if (
      post.likes.filter((like) => like.user.toString() === req.user.id).length >
      0
    ) {
      return res.status(400).json("Post has already been liked!");
    }

    post.likes.unshift({ user: req.user.id });

    await post.save();
    res.json(post.likes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});


// @route PUT api/posts/unlike/:id
// @desc Unlike a post
// @access Private
router.put("/unlike/:id", auth, async (req, res) => {
  try {
    // Get the post first
    const post = await Post.findById(req.params.id);

    // Check if the post has been liked or not
    if (
      post.likes.filter((like) => like.user.toString() === req.user.id)
        .length === 0
    ) {
      return res.status(400).json("Post has not yet been liked!");
    }

    // Get remove index
    const removeIndex = post.likes.map((like) =>
      like.user.toString().indexOf(req.user.id)
    );

    // Splice the likes
    post.likes.splice(removeIndex, 1);

    await post.save();
    res.json(post.likes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
