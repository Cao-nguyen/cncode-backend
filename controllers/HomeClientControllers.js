const Blog = require("../models/BlogModel");
const News = require("../models/NewsModel");
const Grate = require("../models/GrateModel");

const BlogRead = async (req, res) => {
  const data = await Blog.find({
    deleted: false,
    active: "chapnhan",
    show: true,
    isChecked: true,
  })
    .sort({ createdAt: -1 })
    .limit(3)
    .populate("authorId", "fullName avatar");

  if (data) {
    return res.json({
      EM: "Thành công!",
      EC: 0,
      DT: data,
    });
  } else {
    return res.json({
      EM: "Thất bại!",
      EC: -1,
      DT: "",
    });
  }
};

const NewsRead = async (req, res) => {
  const data = await News.find({ deleted: false, show: true, isChecked: true })
    .sort({ createdAt: -1 })
    .limit(3)
    .populate("authorId", "fullName");

  if (data) {
    return res.json({
      EM: "Thành công!",
      EC: 0,
      DT: data,
    });
  } else {
    return res.json({
      EM: "Thất bại!",
      EC: -1,
      DT: "",
    });
  }
};

const GrateCreate = async (req, res) => {
  const { id, rating, comment } = req.body;
  const io = req.app.get("io");

  const data = new Grate({
    rating,
    comment,
    authorId: id,
  });

  if (data) {
    await data.save();
    io.emit("pushGrate");
    return res.json({
      EM: "Đã gửi đánh giá thành công!",
      EC: 0,
      DT: data,
    });
  } else {
    return res.json({
      EM: "Đã gửi đánh giá thất bại!",
      EC: 0,
      DT: data,
    });
  }
};

const GrateRead = async (req, res) => {
  const data = await Grate.find()
    .populate("authorId", "avatar fullName")
    .sort({ createdAt: -1 });

  if (data) {
    return res.json({
      EM: "Thành công!",
      EC: 0,
      DT: data,
    });
  } else {
    return res.json({
      EM: "Thất bại!",
      EC: 0,
      DT: data,
    });
  }
};

module.exports = {
  BlogRead,
  NewsRead,
  GrateCreate,
  GrateRead,
};
