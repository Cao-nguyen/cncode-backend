const Theme = require("../models/ThemeModel");

// [GET] READ
const ThemeRead = async (req, res) => {
  const data = await Theme.find();

  if (data) {
    return res.json({
      EM: "Tải dữ liệu thành công!",
      EC: 0,
      DT: data,
    });
  } else {
    return res.json({
      EM: "Đã có lỗi xảy ra",
      EC: -1,
      DT: "",
    });
  }
};

// [PATCH] EDIT
const ThemeEdit = async (req, res) => {
  const { id } = req.body;

  const data = await Theme.findOneAndUpdate(
    { _id: id },
    [{ $set: { active: { $not: "$active" } } }],
    { new: true }
  );

  if (data) {
    return res.json({
      EM: "Đã thay đổi giao diện thành công!",
      EC: 0,
      DT: "",
    });
  } else {
    return res.json({
      EM: "Đã có lỗi xảy ra",
      EC: -1,
      DT: "",
    });
  }
};

module.exports = { ThemeRead, ThemeEdit };
