const Blog = require("../models/BlogModel");

const BlogRead = async (req, res) => {
  const { id } = req.params;

  const rawBlog = await Blog.find({
    authorId: id,
  })
    .populate("authorId", "fullName")
    .select("-emotion");

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
  const { title, content, description, show, isChecked, img, id } = req.body;

  const blog = new Blog({
    title: title,
    isChecked: isChecked,
    show: Boolean(show),
    img: img,
    description: description,
    content: content,
    active: false,
    authorId: id,
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
