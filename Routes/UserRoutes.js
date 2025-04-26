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
const Shop = require("../controllers/ShopClientControllers");
const Forum = require("../controllers/ForumClientControllers");
const Eye = require("../controllers/EyeClientControllers");

const router = express.Router();

const userRoutes = (app) => {
  const link = "/api/v1/client";
  // Mắt xem
  router.post(`${link}/eye/blog/create`, Eye.EyeBlogCreate);
  router.post(`${link}/eye/new/create`, Eye.EyeNewCreate);

  // Diễn đàn
  router.get(`${link}/forum/read`, Forum.ForumRead);
  router.post(`${link}/forum/join`, Forum.ForumJoin);
  router.post(`${link}/forum/out`, Forum.ForumOut);
  router.post(`${link}/forum/chat`, Forum.ForumChat);
  router.post(`${link}/forum/pushlove`, Forum.ForumPushLove);
  router.post(`${link}/forum/pulllove`, Forum.ForumPullLove);

  // Shop
  router.get(`${link}/shop/read`, Shop.ShopRead);
  router.get(`${link}/shop-user/read/:id`, Shop.ShopUserRead);
  router.post(`${link}/shop/create`, Shop.ShopCreate);

  // Home
  router.get(`${link}/blogHome/read`, Home.BlogRead);
  router.get(`${link}/newsHome/read`, Home.NewsRead);
  router.post(`${link}/grateHome/create`, Home.GrateCreate);
  router.post(`${link}/grateHome/delete`, Home.GrateDelete);
  router.get(`${link}/grateHome/read`, Home.GrateRead);
  router.post(`${link}/user-point/create`, Home.UserPointCreate);
  router.get(`${link}/user-point/read`, Home.UserPointRead);
  router.get(`${link}/tb/read`, Home.ThongBaoHome);

  // Chat with Nguyên
  router.post(`${link}/chat/create`, Chat.ChatCreate);
  router.get(`${link}/chat/read`, Chat.ChatRead);
  router.post(`${link}/chat/win`, Chat.ChatDelete);

  // Settings
  router.post(`${link}/deletedImg`, Settings.UserDeletedImage);
  router.get(`${link}/user/read/:id`, Settings.UserRead);
  router.patch(`${link}/user/edit/fullName`, Settings.UserEditFullName);
  router.patch(`${link}/user/edit/username`, Settings.UserEditUsername);
  router.patch(`${link}/user/edit/info`, Settings.UserEditInfo);
  router.patch(`${link}/user/edit/birthday`, Settings.UserEditBirthday);
  router.patch(`${link}/user/edit/tinh`, Settings.UserEditTinh);
  router.patch(`${link}/user/edit/school`, Settings.UserEditSchool);
  router.patch(`${link}/user/edit/avatar`, Settings.UserEditAvatar);
  router.patch(`${link}/user/edit/web`, Settings.UserEditWeb);
  router.patch(`${link}/user/edit/git`, Settings.UserEditGit);
  router.patch(`${link}/user/edit/zalo`, Settings.UserEditZalo);
  router.patch(`${link}/user/edit/facebook`, Settings.UserEditFacebook);
  router.patch(`${link}/user/edit/tiktok`, Settings.UserEditTiktok);
  router.patch(`${link}/user/edit/youtube`, Settings.UserEditYoutube);
  router.patch(`${link}/user/edit/password`, Settings.UserEditPassword);

  // Ask
  router.post(`${link}/ask/create`, Ask.AskCreate);
  router.post(`${link}/askReply/create`, Ask.AskReplyCreate);
  router.get(`${link}/ask/read`, Ask.AskRead);
  router.post(`${link}/ask/delete`, Ask.AskDelete);

  // Blog
  router.post(`${link}/blog/create`, Blog.BlogCreate);
  router.get(`${link}/blog/read`, Blog.BlogRead);
  router.get(`${link}/meblog/read/:id`, Blog.MeblogRead);
  router.post(`${link}/blog/like`, Blog.BlogLike);
  router.post(`${link}/blog/unlike`, Blog.BlogUnlike);
  router.post(`${link}/blog/f`, Blog.BlogF);
  router.post(`${link}/blog/unf`, Blog.BlogUnf);
  router.post(`${link}/blog/comment/create`, Comment.BlogCommentCreate);
  router.post(`${link}/blog/comment/delete`, Comment.BlogCommentDelete);

  // Profile
  router.get(`${link}/profile/read/:username`, Profile.ProfileRead);
  router.get(`${link}/post/read/:username`, Profile.PostRead);
  router.post(`${link}/change/edit`, Profile.ChangeEdit);

  // Tin tức
  router.get(`/api/v1/news/client/read`, News.NewsRead);
  router.patch(`/api/v1/news/client/news/like`, News.NewsLikeCreate);
  router.post(`/api/v1/news/client/news/unlike`, News.NewsUnlikeCreate);
  router.post(`${link}/news/comment/create`, Comment.NewsCommentCreate);
  router.post(`${link}/news/comment/delete`, Comment.NewsCommentDelete);

  // Đăng ký - Đăng nhập
  router.post(`${link}/xacthuc`, Login.Xacthuc);
  router.post(`${link}/dangky`, Login.RegisterUser);
  router.post(`${link}/dangnhap`, Login.LoginUser);
  router.patch(`${link}/forgot`, Login.Forgot);

  // Truy cập
  router.get(`${link}/access/read`, Access.AccessRead);

  app.use(router);
};

module.exports = userRoutes;
