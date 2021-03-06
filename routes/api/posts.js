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
        userpp: user.profilepic,
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
    const posts = await Post.find().sort({ date: -1 });
    const user = await User.findById(req.user.id).select("-password");
    res.json({ posts, user });
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
// @route GET api/posts/like/:id
//  @desc Get all likes of a post
// @access Private
router.get('/like/:id', auth, async(req, res)=>{
  try {
    // Get the post first
    const post = await Post.findById(req.params.id);
    res.json(post.likes)

  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
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
    let post = await Post.findById(req.params.id);

    // Check if the post has been liked or not
    if (
      post.likes.filter((like) => like.user.toString() === req.user.id)
        .length === 0
    ) {
      return res.status(400).json("Post has not yet been liked!");
    }

    // Get remove index
    const removeIndex = post.likes
      .map((like) => like.user.toString())
      .indexOf(req.user.id);

    // Splice the likes
    post.likes.splice(removeIndex, 1);
    //  post =  post.likes.filter(item => item.user.toString() !== req.user.id )

    await post.save();
    res.json(post.likes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route POST api/posts/comment/:id
// @desc Comment on a post
// @access Private
router.post("/comment/:id", [auth,
[check("text", "Text is required").not().isEmpty()]], async(req, res) => {
  const errors = validationResult(req)
  if(!errors.isEmpty()){
    return res.status(400).json({errors: errors.array() })
  }

  try {
    const user = await User.findById(req.user.id).select('-password')
    const post = await Post.findById(req.params.id);


    const newComment = {
      text:req.body.text,
      name:user.name,
      user:req.user.id
    }

    post.comments.unshift(newComment)
    await post.save()

    res.json(post.comments);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error')
  }

})

// @route GET api/posts/comment/:id
// @desc Get all comments of a post
// @access Private
router.get("/comment/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.json(post.comments);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});
// @route DELETE api/posts/comment/:id
// @desc Delete a comment
// @access Private
router.delete('/post/:id/:comment/:comment_id', auth, async (req, res) => {
  try {
    // Get the post first
    const post = await Post.findById(req.params.id);

    // Pull out the comment

    const comment = post.comments.find((comment) =>  comment.id === req.params.comment_id);

    // Make sure comment exists
    if (!comment) {
      return res.status(404).json({ msg: "Comment does not exist" });
    }

    // Check user
    if (comment.user.toString() !== req.user.id) {
      return res
        .status(400)
        .json({ msg: "User not authorized to perform this action!" });
    }

    // Get remove index
    const removeIndex = post.comments
      .map((comment) => comment.user.toString())
      .indexOf(req.user.id);

    // Splice the array
    post.comments.splice(removeIndex, 1);

    await post.save();

    res.json(post.comments);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
})


module.exports = router;
