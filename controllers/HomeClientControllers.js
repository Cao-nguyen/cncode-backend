const Blog = require("../models/BlogModel");
const News = require("../models/NewsModel");

const BlogRead = async (req, res) => {
  const data = await Blog.find()
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
  const data = await News.find()
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

module.exports = {
  BlogRead,
  NewsRead,
};
