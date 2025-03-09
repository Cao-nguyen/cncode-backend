const Blog = require("../models/BlogModel");

const BlogRead = async (req, res) => {
  const { username } = req.params;

  const rawBlog = await Blog.find({
    By: username,
  });

  if (rawBlog) {
    return res.json({
      EM: "Đăng tải bài viết thành công!",
      EC: 0,
      DT: rawBlog,
    });
  } else {
    return res.json({
      EM: "Đăng tải bài viết thất bại!",
      EC: -1,
      DT: "",
    });
  }
};

const BlogCreate = async (req, res) => {
  const io = req.app.get("io");
  const {
    fullName,
    title,
    content,
    description,
    show,
    isChecked,
    img,
    username,
  } = req.body;

  const blog = new Blog({
    title: title,
    isChecked: isChecked,
    show: Boolean(show),
    img: img,
    description: description,
    content: content,
    active: false,
    fullName: fullName,
    By: username,
  });

  const rawBlog = await blog.save();

  if (rawBlog) {
    io.emit("createBlog", rawBlog);

    return res.json({
      EM: "Đăng tải bài viết thành công!",
      EC: 0,
      DT: rawBlog,
    });
  } else {
    return res.json({
      EM: "Đăng tải bài viết thất bại!",
      EC: -1,
      DT: "",
    });
  }
};

module.exports = { BlogCreate, BlogRead };
