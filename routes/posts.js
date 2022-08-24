const express = require("express");

const router = express.Router();
const Post = require("../models/Post");

router.get("/", async (req, res) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (err) {
    res.json(err);
  }
});

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

router.get("/:postId", async (req, res) => {
  try {
    const posts = await Post.findById(req.params.postId);
    res.json(posts);
  } catch (err) {
    res.json(err);
  }
});

router.delete("/:postId", async (req, res) => {
  try {
    const deletedPosts = await Post.remove({ _id: req.params.postId });
    res.json(deletedPosts);
  } catch (err) {
    res.json(err);
  }
});

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
