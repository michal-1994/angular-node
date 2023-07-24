const express = require("express");

const PostsController = require("../controllers/posts");
const router = express.Router();

const checkAuth = require("../middleware/check-auth");
const extractFile = require("../middleware/file");

router.post("", checkAuth, extractFile, PostsController.createPost);

router.patch("/:id", checkAuth, extractFile, PostsController.updatePost);

router.get("", PostsController.getPosts);

router.get("/:id", PostsController.getPost);

router.delete("/:id", checkAuth, PostsController.deletePost);

module.exports = router;
