const express = require("express");
const Login = require("../controllers/LoginClientControllers");
const News = require("../controllers/NewsClientControllers");
const Profile = require("../controllers/ProfileClientControllers");
const Blog = require("../controllers/BlogClientControllers");
const Access = require("../controllers/AccessAdminControllers");
const Home = require("../controllers/HomeClientControllers");
const Ask = require("../controllers/AskClientControllers");
const Settings = require("../controllers/SettingsClientControllers");
const Comment = require("../controllers/CommentClientServerControllers");
const Chat = require("../controllers/ChatClientControllers");

const router = express.Router();

const userRoutes = (app) => {
  // Home
  router.get("/api/v1/client/blogHome/read", Home.BlogRead);
  router.get("/api/v1/client/newsHome/read", Home.NewsRead);

  // Chat with Nguyên
  router.post("/api/v1/client/chat/create", Chat.ChatCreate);
  router.get("/api/v1/client/chat/read", Chat.ChatRead);
  router.post("/api/v1/client/chat/win", Chat.ChatDelete);

  // Settings
  router.post("/api/v1/client/deletedImg", Settings.UserDeletedImage);
  router.get("/api/v1/client/user/read/:id", Settings.UserRead);
  router.patch("/api/v1/client/user/edit/fullName", Settings.UserEditFullName);
  router.patch("/api/v1/client/user/edit/username", Settings.UserEditUsername);
  router.patch("/api/v1/client/user/edit/info", Settings.UserEditInfo);
  router.patch("/api/v1/client/user/edit/birthday", Settings.UserEditBirthday);
  router.patch("/api/v1/client/user/edit/tinh", Settings.UserEditTinh);
  router.patch("/api/v1/client/user/edit/school", Settings.UserEditSchool);
  router.patch("/api/v1/client/user/edit/avatar", Settings.UserEditAvatar);
  router.patch("/api/v1/client/user/edit/web", Settings.UserEditWeb);
  router.patch("/api/v1/client/user/edit/git", Settings.UserEditGit);
  router.patch("/api/v1/client/user/edit/zalo", Settings.UserEditZalo);
  router.patch("/api/v1/client/user/edit/facebook", Settings.UserEditFacebook);
  router.patch("/api/v1/client/user/edit/tiktok", Settings.UserEditTiktok);
  router.patch("/api/v1/client/user/edit/youtube", Settings.UserEditYoutube);
  router.patch("/api/v1/client/user/edit/password", Settings.UserEditPassword);

  // Ask
  router.post("/api/v1/client/ask/create", Ask.AskCreate);
  router.post("/api/v1/client/askReply/create", Ask.AskReplyCreate);
  router.get("/api/v1/client/ask/read", Ask.AskRead);
  router.post("/api/v1/client/ask/delete", Ask.AskDelete);

  // Blog
  router.post("/api/v1/client/blog/create", Blog.BlogCreate);
  router.get("/api/v1/client/blog/read", Blog.BlogRead);
  router.get("/api/v1/client/meblog/read/:id", Blog.MeblogRead);
  router.post("/api/v1/client/blog/like", Blog.BlogLike);
  router.post("/api/v1/client/blog/unlike", Blog.BlogUnlike);
  router.post("/api/v1/client/blog/f", Blog.BlogF);
  router.post("/api/v1/client/blog/unf", Blog.BlogUnf);
  router.post("/api/v1/client/blog/comment/create", Comment.BlogCommentCreate);
  router.post("/api/v1/client/blog/comment/delete", Comment.BlogCommentDelete);

  // Profile
  router.get("/api/v1/client/profile/read/:username", Profile.ProfileRead);
  router.get("/api/v1/client/post/read/:username", Profile.PostRead);

  // Tin tức
  router.get("/api/v1/news/client/read", News.NewsRead);
  router.patch("/api/v1/news/client/news/like", News.NewsLikeCreate);
  router.post("/api/v1/news/client/news/unlike", News.NewsUnlikeCreate);
  router.post("/api/v1/client/news/comment/create", Comment.NewsCommentCreate);
  router.post("/api/v1/client/news/comment/delete", Comment.NewsCommentDelete);

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
