const News = require("../models/NewsModel");

const NewsCreate = async (req, res) => {
  try {
    const {
      title,
      isChecked,
      show,
      description,
      content,
      id: authorId,
    } = req.body;

    if (!authorId) {
      return res.json({ EC: -1, EM: "Người đăng tin là bắt buộc", DT: "" });
    }

    const newNews = new News({
      title,
      isChecked,
      show,
      description,
      content,
      authorId,
    });

    await newNews.save();

    return res.json({
      EC: 0,
      EM: "Đã đăng tải tin tức thành công!",
      DT: newNews,
    });
  } catch (error) {
    console.log(error);
    return res.json({ EC: -1, EM: "Đã có lỗi xảy ra", DT: error.message });
  }
};

const NewsRead = async (req, res) => {
  try {
    const news = await News.find({ deleted: false })
      .populate("authorId", "fullName")
      .sort({ createdAt: -1 });

    return res.json({ EC: 0, EM: "Thành công", DT: news });
  } catch (error) {
    return res.json({ EC: -1, EM: "Thất bại", DT: error.message });
  }
};

const NewsEdit = async (req, res) => {
  try {
    const { id, title, description, isChecked, show, content } = req.body;

    if (!id) {
      return res.json({ EC: -1, EM: "ID không hợp lệ", DT: "" });
    }

    const updatedNews = await News.findByIdAndUpdate(
      id,
      { title, description, isChecked, show, content },
      { new: true }
    );

    return res.json({
      EC: 0,
      EM: "Đã cập nhật tin tức thành công",
      DT: updatedNews,
    });
  } catch (error) {
    return res.json({ EC: -1, EM: "Có lỗi xảy ra", DT: error.message });
  }
};

const NewsDelete = async (req, res) => {
  try {
    const { id } = req.body;

    if (!id) {
      return res.json({ EC: -1, EM: "ID không hợp lệ", DT: "" });
    }

    await News.findByIdAndUpdate(id, { deleted: true });

    return res.json({ EC: 0, EM: "Đã xoá tin tức này thành công!", DT: "" });
  } catch (error) {
    return res.json({ EC: -1, EM: "Đã có lỗi xảy ra", DT: error.message });
  }
};

module.exports = { NewsCreate, NewsRead, NewsEdit, NewsDelete };
