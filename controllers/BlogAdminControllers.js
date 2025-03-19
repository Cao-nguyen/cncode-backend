const Blog = require("../models/BlogModel");

const BlogRead = async (req, res) => {
  const data = await Blog.find({ deleted: false }).populate(
    "authorId",
    "fullName"
  );

  if (data) {
    return res.json({
      EM: "Thành công",
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

const BlogDelete = async (req, res) => {
  const { id } = req.params;

  const data = await Blog.findOneAndUpdate({ _id: id }, { deleted: true });

  if (data) {
    return res.json({
      EM: "Đã xoá blog này thành công",
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

module.exports = { BlogRead, BlogDelete };
