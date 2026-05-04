const mongoose = require("mongoose");

const EbookSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  isFree: Boolean,
  fileUrl: String,
  coverUrl: String
});

module.exports = mongoose.model("Ebook", EbookSchema);
