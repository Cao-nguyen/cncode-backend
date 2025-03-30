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

const router = express.Router();

const adminRoutes = (app) => {
  // Admin - Blog
  router.get("/api/v1/admin/blog/read", Blog.BlogRead);
  router.patch("/api/v1/admin/blog/delete/:id", Blog.BlogDelete);
  router.post("/api/v1/admin/blog/create", Blog.BlogCreate);
  router.patch("/api/v1/admin/blog/edit/:id", Blog.BlogEdit);
  router.patch("/api/v1/admin/blog/duyet", Blog.BlogDuyet);
  router.patch("/api/v1/admin/blog/tuchoi", Blog.BlogTuchoi);

  // Admin - Thông tin về website
  router.patch("/api/v1/admin/web/read", Web.WebRead);
  router.patch("/api/v1/admin/web/edit", Web.WebEdit);

  // Admin - Chính sách thành viên
  router.get("/api/v1/admin/member/read", Member.MemberRead);
  router.patch("/api/v1/admin/member/edit", Member.MemberEdit);

  // Admin - Điều khoản sử dụng
  router.get("/api/v1/admin/use/read", Use.UseRead);
  router.patch("/api/v1/admin/use/edit", Use.UseEdit);

  // Admin - Chính sách bảo mật
  router.get("/api/v1/admin/ssl/read", Ssl.SslRead);
  router.patch("/api/v1/admin/ssl/edit", Ssl.SslEdit);

  // Admin - Giao diện
  router.get("/api/v1/admin/theme/read", Theme.ThemeRead);
  router.patch("/api/v1/admin/theme/edit", Theme.ThemeEdit);

  // Admin - Tin tức
  router.get("/api/v1/admin/news/read", News.NewsRead);
  router.post("/api/v1/admin/news/create", News.NewsCreate);
  router.patch("/api/v1/admin/news/edit/:id", News.NewsEdit);
  router.patch("/api/v1/admin/news/delete/:id", News.NewsDelete);

  // Admin - Thùng rác
  router.post("/api/v1/bins/news/delete", Bins.BinsNewsDelete);
  router.patch("/api/v1/bins/news/edit", Bins.BinsNewsEdit);
  router.get("/api/v1/bins/news/read", Bins.BinsNewsRead);
  router.post("/api/v1/bins/blog/delete", Bins.BinsBlogDelete);
  router.patch("/api/v1/bins/blog/edit", Bins.BinsBlogEdit);
  router.get("/api/v1/bins/blog/read", Bins.BinsBlogRead);

  // Admin - Giới thiệu
  router.patch("/api/v1/admin/infor/edit", Infor.InforEdit);
  router.get("/api/v1/admin/infor/read", Infor.InforRead);

  app.use(router);
};

module.exports = adminRoutes;
