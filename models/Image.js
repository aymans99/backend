const mongoose = require("mongoose");
const validator = require("validator");

const imageSchema = mongoose.Schema({
  title: {
    type: String,
    required: [true, "pls enter"],
    maxLength: [30, "title cannot be more than 30 characters"],
  },
  description: {
    type: String,
    required: [true, "pls enter"],
    maxLength: [30, "title cannot be more than 30 characters"],
  },
  keywords: {
    type: String,
    required: [true, "pls enter"],
    maxLength: [30, "title cannot be more than 30 characters"],
  },
  image: {
    type: String,
    required: true,
  },
});
module.exports = mongoose.model("image", imageSchema);
