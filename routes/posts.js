const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const Post = require("../models/Post");

function databaseReady() {
  return mongoose.connection.readyState === 1;
}

router.get("/", async (req, res) => {
  if (!databaseReady()) {
    return res.json([]);
  }

  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch posts" });
  }
});

router.post("/create", async (req, res) => {
  if (!databaseReady()) {
    return res.status(503).json({ error: "Database is not connected" });
  }

  try {
    const post = new Post(req.body);
    await post.save();
    res.json(post);
  } catch (error) {
    res.status(500).json({ error: "Failed to create post" });
  }
});

module.exports = router;
