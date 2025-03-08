const express = require("express");
const Login = require("../controllers/LoginClientControllers");
const News = require("../controllers/NewsClientControllers");

const router = express.Router();

const userRoutes = (app) => {
  // Tin tức
  router.get("/api/v1/admin/comment/read/:slug", News.CommentRead);
  router.patch("/api/v1/admin/comment/like", News.CommentLike);
  router.patch("/api/v1/admin/comment/unlike", News.CommentUnlike);
  router.post("/api/v1/admin/comment/delete", News.CommentDelete);
  router.post("/api/v1/admin/comment/delete/reply", News.CommentDeleteReply);
  router.post("/api/v1/admin/comment/create", News.CommentCreate);
  router.get("/api/v1/news/client/read", News.NewsRead);
  router.patch("/api/v1/news/client/news/like", News.NewsLikeCreate);
  router.post("/api/v1/news/client/news/unlike", News.NewsUnlikeCreate);

  // Đăng ký - Đăng nhập
  router.post("/api/v1/client/xacthuc", Login.Xacthuc);
  router.post("/api/v1/client/dangky", Login.RegisterUser);
  router.post("/api/v1/client/dangnhap", Login.LoginUser);
  router.patch("/api/v1/client/forgot", Login.Forgot);

  app.use(router);
};

module.exports = userRoutes;
