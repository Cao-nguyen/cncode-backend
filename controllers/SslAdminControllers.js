const Ssl = require("../models/SslModel");

const SslRead = async (req, res) => {
  const data = await Ssl.findOne();

  if (data) {
    return res.json({
      EC: 0,
      EM: "Đã cập nhật chính sách bảo mật thành công!",
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

const SslEdit = async (req, res) => {
  const { content } = req.body;

  const data = await Ssl.updateOne({
    content: content,
  });

  if (data) {
    return res.json({
      EC: 0,
      EM: "Đã cập nhật chính sách bảo mật thành công!",
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

module.exports = { SslEdit, SslRead };
