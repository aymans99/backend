const Image = require("../models/Image");
const fs = require("fs");
const path = require("path");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("../middlewares/catchAsyncerrors");

// exports.addImage = catchAsyncError(async (req, res, next) => {
//   const image = req.file ? req.file.filename : null;
//   const { title, description, keywords } = req.body;

//   if (!title || !description || !keywords || !image) {
//     return next(new ErrorHandler("pls enter the required fields", 400));
//     const imageDetails = await Image.findOne({ filename: req.file.filename });
//     console.log(imageDetails);
//     if (image) {
//       console.log(image);
//       const imagePath = path.join(__dirname, "../public/images/", image);
//       fs.unlinkSync(imagePath);
//     }
//   }
//   const result = await Image.create({
//     title,
//     description,
//     keywords,
//     image,
//   });

//   res.status(201).json({
//     success: true,
//     message: "added",
//   });
// });

exports.addImage = catchAsyncError(async (req, res, next) => {
  const image = req.file ? req.file.filename : null;
  console.log(image);
  const { title, description, keywords } = req.body;

  if (!title || !description || !keywords || !image) {
    // Delete the uploaded image if validation fails
    if (image) {
      const imagePath = path.join(__dirname, "../public/images/", image);
      fs.unlinkSync(imagePath);
    }
    return next(new ErrorHandler("Please enter the required fields", 400));
  }

  const result = await Image.create({
    title,
    description,
    keywords,
    image,
  });

  res.status(201).json({
    success: true,
    message: "added",
  });
});
