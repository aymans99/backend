const express = require("express");
const router = express.Router();
const { addImage } = require("../Controllers/imageController");
// const { validateImageUpload } = require("../utils/Validator");
const multer = require("multer");
// const { validateImageUpload } = require("../middlewares/Validate");
const { registerUser } = require("../Controllers/userController");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/images");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

router.route("/upload").post(upload.single("image"), addImage);
// router.route("/images").get(getImages);
module.exports = router;
