const express = require("express");

const router = express.Router();
const Post = require("../models/Post");

//get all Blogs from database
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (err) {
    res.json(err);
  }
});

//post blog to databse
router.post("/", (req, res) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content,
  });

  post
    .save()
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

//get a specific blog
router.get("/:postId", async (req, res) => {
  try {
    const posts = await Post.findById(req.params.postId);
    res.json(posts);
  } catch (err) {
    res.json(err);
  }
});

//delete a specific blog from databse
router.delete("/:postId", async (req, res) => {
  try {
    const deletedPosts = await Post.remove({ _id: req.params.postId });
    res.json(deletedPosts);
  } catch (err) {
    res.json(err);
  }
});

//update a specific blog
router.patch("/:postId", async (req, res) => {
  try {
    const updatedPosts = await Post.updateOne(
      { _id: req.params.postId },
      { $set: { content: req.body.content } }
    );
    res.json(updatedPosts);
  } catch (err) {
    res.json(err);
  }
});

module.exports = router;
