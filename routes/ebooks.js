const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");
const Ebook = require("../models/Ebook");
const router = express.Router();

function databaseReady() {
  return mongoose.connection.readyState === 1;
}

const storage = multer.diskStorage({
  destination: "uploads/ebooks",
  filename: (req, file, cb) => {
    const safeName = path.basename(file.originalname).replace(/[^\w.-]/g, "_");
    cb(null, Date.now() + "-" + safeName);
  }
});

const upload = multer({ storage });

router.get("/", async (req, res) => {
  if (!databaseReady()) {
    return res.json([]);
  }

  try {
    const ebooks = await Ebook.find();
    res.json(ebooks);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch ebooks" });
  }
});

router.post("/upload", (req, res, next) => {
  if (!databaseReady()) {
    return res.status(503).json({ error: "Database is not connected" });
  }
  next();
}, upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "Ebook file is required" });
    }

    const ebook = new Ebook({
      title: req.body.title,
      description: req.body.description,
      price: req.body.price,
      isFree: req.body.isFree === "true" || req.body.isFree === true,
      fileUrl: req.file.path.replace(/\\/g, "/"),
      coverUrl: req.body.coverUrl || ""
    });

    await ebook.save();
    res.json(ebook);
  } catch (error) {
    res.status(500).json({ error: "Failed to upload ebook" });
  }
});

module.exports = router;
