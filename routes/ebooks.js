const express = require("express");
const multer = require("multer");
const Ebook = require("../models/Ebook");
const router = express.Router();

const storage = multer.diskStorage({
  destination: "uploads/ebooks",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

const upload = multer({ storage });

router.post("/upload", upload.single("file"), async (req, res) => {
  try {
    const ebook = new Ebook({
      title: req.body.title,
      description: req.body.description,
      price: req.body.price,
      isFree: req.body.isFree === "true" || req.body.isFree === true,
      fileUrl: req.file.path,
      coverUrl: req.body.coverUrl || ""
    });

    await ebook.save();
    res.json(ebook);
  } catch (error) {
    res.status(500).json({ error: "Failed to upload ebook" });
  }
});

module.exports = router;
