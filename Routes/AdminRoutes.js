const express = require("express");
const Bins = require("../controllers/BinsAdminControllers");
const Infor = require("../controllers/InforAdminControllers");
const News = require("../controllers/NewsAdminControllers");
const Theme = require("../controllers/ThemeAdminControllers");

const router = express.Router();

const adminRoutes = (app) => {
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

  // Admin - Giới thiệu
  router.patch("/api/v1/admin/infor/edit", Infor.InforEdit);
  router.get("/api/v1/admin/infor/read", Infor.InforRead);

  app.use(router);
};

module.exports = adminRoutes;
