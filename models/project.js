const mongoose = require("mongoose");
const validator = require("validator");

const projectSchema = mongoose.Schema({
  image: {
    type: String,
    required: [true, "image is required"],
  },
  title: {
    type: String,
    required: [true, "title is required"],
    maxLength: [20, "title cannot exceed 20 characters"],
  },
  description: {
    type: String,
    required: [true, "description is required"],
    maxLength: [20, "description cannot exceed 20 characters"],
  },
  startDate: {
    type: Date,
    required: [true, "startDate is required"],
  },
  endDate: {
    type: Date,
    required: [true, "endDate is required"],
  },
  timeline: {
    type: Number,
    required: [true, "timeline is required"],
  },
});
module.exports = mongoose.model("project", projectSchema);
