const News = require("../models/NewsModel");

const BinsNewsDelete = async (req, res) => {
  try {
    const { id } = req.body;

    await News.deleteOne({ _id: id });

    return res.json({
      EM: "Đã xoá vĩnh viễn thành công!",
      EC: 0,
      DT: "",
    });
  } catch {
    return res.json({
      EM: "Đã có lỗi xảy ra",
      EC: -1,
      DT: "",
    });
  }
};

const BinsNewsEdit = async (req, res) => {
  try {
    const { id } = req.body;

    await News.updateOne({ _id: id }, { deleted: false });

    return res.json({
      EM: "Đã khôi phục thành công!",
      EC: 0,
      DT: "",
    });
  } catch {
    return res.json({
      EM: "Đã có lỗi xảy ra",
      EC: -1,
      DT: "",
    });
  }
};

const BinsNewsRead = async (req, res) => {
  try {
    const data = await News.find({ deleted: true }).sort({ createdAt: -1 });

    return res.json({
      EM: "Lấy thông tin thành công!",
      EC: 0,
      DT: data,
    });
  } catch (error) {
    console.error(error);
    return res.json({
      EM: "Không thành công",
      EC: -1,
      DT: "",
    });
  }
};

module.exports = {
  BinsNewsDelete,
  BinsNewsEdit,
  BinsNewsRead,
};
