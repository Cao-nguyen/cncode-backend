const express = require("express");
const Bins = require("../controllers/BinsAdminControllers");
const Infor = require("../controllers/InforAdminControllers");
const News = require("../controllers/NewsAdminControllers");
const Theme = require("../controllers/ThemeAdminControllers");
const Ssl = require("../controllers/SslAdminControllers");
const Use = require("../controllers/UseAdminControllers");
const Member = require("../controllers/MemberAdminControllers");
const Web = require("../controllers/WebAdminControllers");
const Blog = require("../controllers/BlogAdminControllers");
const Shop = require("../controllers/ShopAdminControllers");
const Forum = require("../controllers/ForumAdminControllers");
const Settings = require("../controllers/SettingsAdminControllers");
const Contest = require("../controllers/ContestAdminControllers");
const User = require("../controllers/UserAdminControllers");
const Course = require("../controllers/CourseAdminControllers");

const router = express.Router();

const adminRoutes = (app) => {
  const link = "/api/v1/admin";

  // Khoá học
  router.post(`${link}/course/create`, Course.CourseCreate);
  router.get(`${link}/course/read`, Course.CourseRead);
  router.post(`${link}/dm/create`, Course.DmCreate);
  router.post(`${link}/ls/create`, Course.LsCreate);
  router.post(`${link}/video/create`, Course.VideoCreate);

  // Tài khoản
  router.get(`${link}/user/read`, User.UserRead);

  // Admin - Luyện tập
  router.post(`${link}/contest/create`, Contest.ContestCreate);
  router.get(`${link}/contest/read`, Contest.ContestRead);

  // Admin - Settings
  router.post(`${link}/settings/banner/upload`, Settings.SettingsBannerUpload);
  router.get(`${link}/settings/banner/read`, Settings.SettingsBannerRead);
  router.post(`${link}/settings/banner/delete`, Settings.SettingsBannerDelete);

  // Admin - Diễn đàn
  router.post(`${link}/forum/create`, Forum.ForumCreate);
  router.post(`${link}/forum/edit`, Forum.ForumEdit);
  router.post(`${link}/forum/delete`, Forum.ForumDelete);
  router.get(`${link}/forum/read`, Forum.ForumRead);
  router.post(`${link}/forum/upload`, Forum.ForumUpload);

  // Admin - Shop
  router.post(`${link}/shop/create`, Shop.ShopCreate);
  router.get(`${link}/shop/read`, Shop.ShopRead);
  router.post(`${link}/shop/delete`, Shop.ShopDelete);

  // Admin - Blog
  router.get(`${link}/blog/read`, Blog.BlogRead);
  router.patch(`${link}/blog/delete/:id`, Blog.BlogDelete);
  router.post(`${link}/blog/create`, Blog.BlogCreate);
  router.patch(`${link}/blog/edit/:id`, Blog.BlogEdit);
  router.patch(`${link}/blog/duyet`, Blog.BlogDuyet);
  router.patch(`${link}/blog/tuchoi`, Blog.BlogTuchoi);

  // Admin - Thông tin về website
  router.patch(`${link}/web/read`, Web.WebRead);
  router.patch(`${link}/web/edit`, Web.WebEdit);

  // Admin - Chính sách thành viên
  router.get(`${link}/member/read`, Member.MemberRead);
  router.patch(`${link}/member/edit`, Member.MemberEdit);

  // Admin - Điều khoản sử dụng
  router.get(`${link}/use/read`, Use.UseRead);
  router.patch(`${link}/use/edit`, Use.UseEdit);

  // Admin - Chính sách bảo mật
  router.get(`${link}/ssl/read`, Ssl.SslRead);
  router.patch(`${link}/ssl/edit`, Ssl.SslEdit);

  // Admin - Giao diện
  router.get(`${link}/theme/read`, Theme.ThemeRead);
  router.patch(`${link}/theme/edit`, Theme.ThemeEdit);

  // Admin - Tin tức
  router.get(`${link}/news/read`, News.NewsRead);
  router.post(`${link}/news/create`, News.NewsCreate);
  router.patch(`${link}/news/edit/:id`, News.NewsEdit);
  router.patch(`${link}/news/delete/:id`, News.NewsDelete);

  // Admin - Thùng rác
  router.post(`/api/v1/bins/news/delete`, Bins.BinsNewsDelete);
  router.patch(`/api/v1/bins/news/edit`, Bins.BinsNewsEdit);
  router.get(`/api/v1/bins/news/read`, Bins.BinsNewsRead);
  router.post(`/api/v1/bins/blog/delete`, Bins.BinsBlogDelete);
  router.patch(`/api/v1/bins/blog/edit`, Bins.BinsBlogEdit);
  router.get(`/api/v1/bins/blog/read`, Bins.BinsBlogRead);

  // Admin - Giới thiệu
  router.patch(`${link}/infor/edit`, Infor.InforEdit);
  router.get(`${link}/infor/read`, Infor.InforRead);

  app.use(router);
};

module.exports = adminRoutes;
