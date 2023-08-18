const Project = require("../models/project");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("../middlewares/catchAsyncerrors");
const fs = require("fs");
const path = require("path");

exports.addProject = catchAsyncError(async (req, res, next) => {
  const image = req.file ? req.file.filename : null;
  const { title, description, startDate, endDate, timeline } = req.body;
  if (!title || !description || !startDate || !endDate || !timeline) {
    if (image) {
      const imagePath = path.join(__dirname, "../public/images/", image);
      fs.unlinkSync(imagePath);
    }
    return next(new ErrorHandler("pls enter the fields", 400));
  }
  const project = await Project.create({
    title,
    description,
    startDate,
    endDate,
    timeline,
  });
});
