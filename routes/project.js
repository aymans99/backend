const express = require("express");
const router = express.Router();
const { addProject } = require("../Controllers/projectController");
const { isAuthenticated, authorizeRoles } = require("../middlewares/auth");
const multer = require("multer");

//create a folder in public for project images
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/projimages");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

//will add the project if the user is authenticated and authorized ie admin
router
  .route("/addproject")
  .post(
    upload.single("image"),
    isAuthenticated,
    authorizeRoles("admin"),
    addProject
  );

module.exports = router;
