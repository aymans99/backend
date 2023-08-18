const Image = require("../models/Image");
const User = require("../models/user");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("../middlewares/catchAsyncerrors");
const sendToken = require("../utils/jwtToken");

exports.registerUser = catchAsyncError(async (req, res, next) => {
  const { username, password } = req.body;

  //validate request fields if not show error
  if (!username || !password) {
    return next(new ErrorHandler("pls enter the fields", 400));
  }
  const user = await User.create({
    username,
    password,
  });
  res.status(201).json({
    success: true,
    message: "User created successfully",
  });
});

exports.loginUser = catchAsyncError(async (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return next(new ErrorHandler("pls enter credentials to login", 400));
  }
  const user = await User.findOne({ username }).select("+password");

  if (!user) {
    return next(new ErrorHandler("invalid credentials", 401));
  }
  const isPassword = await user.comparePassword(password);

  if (!isPassword) {
    return next(new ErrorHandler("invlaid password ", 401));
  }
  //   res.status(200).json({
  //     success: true,
  //     message: "login successful",
  //   });
  sendToken(user, 200, res);
});
