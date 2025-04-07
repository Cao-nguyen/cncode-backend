const Blog = require("../models/BlogModel");

const BlogRead = async (req, res) => {
  const data = await Blog.find({ deleted: false })
    .populate("authorId", "fullName")
    .sort({ createdAt: -1 });

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

const BlogCreate = async (req, res) => {
  try {
    const { title, isChecked, show, description, content, img, authorId } =
      req.body;

    if (!authorId) {
      return res.json({ EC: -1, EM: "Người đăng tin là bắt buộc", DT: "" });
    }

    if (show === "") {
      showFormat = false;
    } else {
      showFormat = show;
    }

    const newBlog = new Blog({
      title,
      isChecked,
      showFormat,
      description,
      content,
      img,
      show,
      authorId,
    });

    await newBlog.save();

    return res.json({
      EC: 0,
      EM: "Đã đăng tải blog thành công!",
      DT: newBlog,
    });
  } catch (error) {
    console.log(error);
    return res.json({ EC: -1, EM: "Đã có lỗi xảy ra", DT: error.message });
  }
};

const BlogEdit = async (req, res) => {
  try {
    const { id, title, description, isChecked, show, content } = req.body;

    if (show === "") {
      showFormat = false;
    } else {
      showFormat = show;
    }

    if (!id) {
      return res.json({ EC: -1, EM: "ID không hợp lệ", DT: "" });
    }

    const updateBlog = await Blog.findByIdAndUpdate(
      id,
      { title, description, isChecked, show, content },
      { new: true }
    );

    return res.json({
      EC: 0,
      EM: "Đã cập nhật blog thành công",
      DT: updateBlog,
    });
  } catch (error) {
    return res.json({ EC: -1, EM: "Có lỗi xảy ra", DT: error.message });
  }
};

const BlogDuyet = async (req, res) => {
  const idDuyet = req.body.idDuyet;

  const data = await Blog.findOneAndUpdate(
    { _id: idDuyet },
    { active: "chapnhan" }
  );

  if (data) {
    return res.json({
      EM: "Thành công",
      EC: 0,
      DT: data,
    });
  } else {
    return res.json({
      EM: "Thất bại",
      EC: -1,
      DT: "",
    });
  }
};

const BlogTuchoi = async (req, res) => {
  const idDuyet = req.body.idDuyet;

  const data = await Blog.findOneAndUpdate(
    { _id: idDuyet },
    { active: "tuchoi", deleted: true }
  );

  if (data) {
    return res.json({
      EM: "Thành công",
      EC: 0,
      DT: data,
    });
  } else {
    return res.json({
      EM: "Thất bại",
      EC: -1,
      DT: "",
    });
  }
};

module.exports = {
  BlogRead,
  BlogDelete,
  BlogCreate,
  BlogEdit,
  BlogDuyet,
  BlogTuchoi,
};
