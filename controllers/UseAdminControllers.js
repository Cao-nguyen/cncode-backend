const Use = require("../models/UseModel");

const UseRead = async (req, res) => {
  const data = await Use.findOne();

  if (data) {
    return res.json({
      EC: 0,
      EM: "Đã cập nhật điều khoản sử dụng thành công!",
      DT: data,
    });
  } else {
    return res.json({
      EC: -1,
      EM: "Đã có lỗi xảy ra!",
      DT: "",
    });
  }
};

const UseEdit = async (req, res) => {
  const { content } = req.body;

  const data = await Use.updateOne({
    content: content,
  });

  if (data) {
    return res.json({
      EC: 0,
      EM: "Đã cập nhật điều khoản sử dụng thành công!",
      DT: "",
    });
  } else {
    return res.json({
      EC: -1,
      EM: "Đã có lỗi xảy ra!",
      DT: "",
    });
  }
};

module.exports = { UseRead, UseEdit };
