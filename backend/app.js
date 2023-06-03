const express = require("express");

const app = express();

app.use("/api/posts", (req, res, next) => {
  const posts = [
    {
      id: 1,
      title: "First server-side post",
      content: "This is coming from the server",
    },
    {
      id: 2,
      title: "Second server-side post",
      content: "This is coming from the server!",
    },
  ];
  res.status(200).json({
    message: "Posts fetched succesfully!",
    posts: posts,
  });
});

module.exports = app;
