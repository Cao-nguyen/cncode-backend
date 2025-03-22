const express = require("express");
const Login = require("../controllers/LoginClientControllers");
const News = require("../controllers/NewsClientControllers");
const Profile = require("../controllers/ProfileClientControllers");
const Blog = require("../controllers/BlogClientControllers");
const Access = require("../controllers/AccessAdminControllers");
const Home = require("../controllers/HomeClientControllers");

const router = express.Router();

const userRoutes = (app) => {
  // Home
  router.get("/api/v1/client/blogHome/read", Home.BlogRead);
  router.get("/api/v1/client/newsHome/read", Home.NewsRead);

  // Blog
  router.post("/api/v1/client/blog/create", Blog.BlogCreate);
  router.get("/api/v1/client/blog/read", Blog.BlogRead);
  router.get("/api/v1/client/meblog/read/:id", Blog.MeblogRead);

  // Profile
  router.get("/api/v1/client/profile/read/:username", Profile.ProfileRead);
  router.get("/api/v1/client/post/read/:username", Profile.PostRead);

  // Tin tức
  router.get("/api/v1/client/comment/read/:slug", News.CommentRead);
  router.patch("/api/v1/client/comment/like", News.CommentLike);
  router.patch("/api/v1/client/comment/unlike", News.CommentUnlike);
  router.post("/api/v1/client/comment/delete", News.CommentDelete);
  router.post("/api/v1/client/comment/delete/reply", News.CommentDeleteReply);
  router.post("/api/v1/client/comment/create", News.CommentCreate);
  router.get("/api/v1/news/client/read", News.NewsRead);
  router.patch("/api/v1/news/client/news/like", News.NewsLikeCreate);
  router.post("/api/v1/news/client/news/unlike", News.NewsUnlikeCreate);

  // Đăng ký - Đăng nhập
  router.post("/api/v1/client/xacthuc", Login.Xacthuc);
  router.post("/api/v1/client/dangky", Login.RegisterUser);
  router.post("/api/v1/client/dangnhap", Login.LoginUser);
  router.patch("/api/v1/client/forgot", Login.Forgot);

  // Truy cập
  router.get("/api/v1/client/access/read", Access.AccessRead);

  app.use(router);
};

module.exports = userRoutes;
