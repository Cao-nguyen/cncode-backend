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
  const io = req.app.get("io");
  const { id } = req.body;

  await Theme.updateMany({}, { active: false });

  const data = await Theme.findOneAndUpdate(
    { _id: id },
    { active: true },
    { new: true }
  );

  if (data) {
    io.emit("changeTheme", data);

    return res.json({
      EM: "Đã thay đổi giao diện thành công!",
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

module.exports = { ThemeRead, ThemeEdit };
