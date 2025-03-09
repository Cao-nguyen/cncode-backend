const Blog = require("../models/BlogModel");

const BlogCreate = async (req, res) => {
  const io = req.app.get("io");
  const { fullName, title, content, description, show, isChecked, img } =
    req.body;

  const blog = new Blog({
    title: title,
    isChecked: isChecked,
    show: show,
    img: img,
    description: description,
    content: content,
    active: false,
    fullName: fullName,
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

module.exports = { BlogCreate };
