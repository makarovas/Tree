const express = require("express");
const path = require("path");
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const CORSMiddleware = require("./middlewares/CORSMiddleware");
const indexRouter = require("./routes/index");
const treeRouter = require("./routes/tree");
const { Console } = require("console");

const app = express();

app.use(logger("dev"));
app.use("/api", CORSMiddleware);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use("/", indexRouter);
app.use("/api/tree", treeRouter);

module.exports = app;
