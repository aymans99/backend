const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: [true, "pls enter username"],
    maxLength: [10, "username cannot be more than 10 character"],
  },
  password: {
    type: String,
    required: [true, "pls enter password"],
    maxLength: [10, "password cannot be more than 10 characters"],
  },
  role: {
    type: String,
    default: "user",
  },
});
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    //if password is being changed it will encrypt it first
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};
userSchema.methods.getJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_TIME,
  });
};

module.exports = mongoose.model("user", userSchema);
