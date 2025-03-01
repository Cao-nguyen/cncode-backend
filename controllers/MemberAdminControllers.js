const Member = require("../models/MemberModel");

const MemberRead = async (req, res) => {
  const data = await Member.findOne();

  if (data) {
    return res.json({
      EC: 0,
      EM: "Đã cập nhật chính sách thành viên thành công!",
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

const MemberEdit = async (req, res) => {
  const { content } = req.body;

  const data = await Member.updateOne({
    content: content,
  });

  if (data) {
    return res.json({
      EC: 0,
      EM: "Đã cập nhật chính sách thành viên thành công!",
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

module.exports = {
  MemberRead,
  MemberEdit,
};
