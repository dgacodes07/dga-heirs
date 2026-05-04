const express = require("express");
const router = express.Router();
const Post = require("../models/Post");

router.post("/create", async (req, res) => {
  try {
    const post = new Post(req.body);
    await post.save();
    res.json(post);
  } catch (error) {
    res.status(500).json({ error: "Failed to create post" });
  }
});

module.exports = router;
