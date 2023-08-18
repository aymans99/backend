const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config({ path: "backend/config/config.env" });
const errorMiddleware = require("./middlewares/errors");
const image = require("./routes/image");
const user = require("./routes/user");
const project = require("./routes/project");
const bodyparser = require("body-parser");
const cookieParser = require("cookie-parser");
app.use(express.json()); // for parsing application/json
app.use(cookieParser());
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
// app.use(bodyparser.urlencoded({ extended: true }));
app.use("/api/v1", image);
app.use("/api/v1", user);
app.use("/api/v1", project);

app.use(errorMiddleware);
module.exports = app;
