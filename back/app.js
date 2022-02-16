const express = require("express");
const path = require("path");
const app = express();
require("dotenv").config();
const helmet = require("helmet");
const authRoutes = require("./routes/auth.js");
const postRoutes = require("./routes/post.js");
const userRoutes = require("./routes/user.js");
const commentsRoutes = require("./routes/comments.js");
const adminRoutes = require("./routes/admin.js");
//const Db = require("./db/db.js");


app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
    );
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, DELETE, PATCH, OPTIONS"
    );
    next();
  });
  
app.use("/images", express.static(path.join(__dirname, "images")));
app.use(express.json());
app.use(helmet());
app.use("/api/auth", authRoutes);
app.use("/api/post", postRoutes);
app.use("/api/user", userRoutes);
app.use("/api/comments", commentsRoutes);
app.use("/api/admin", adminRoutes);

module.exports = app;