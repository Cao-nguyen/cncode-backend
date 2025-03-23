const User = require("../models/UserModel");

const UserRead = async (req, res) => {
  const id = req.params.id;

  const data = await User.findOne({ _id: id });

  if (data) {
    return res.json({
      EM: "Thành công!",
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

const UserEdit = async (req, res) => {
  const {
    id,
    fullName,
    username,
    info,
    birthday,
    tinh,
    school,
    avatar,
    web,
    git,
    zalo,
    facebook,
    tiktok,
    youtube,
  } = req.body;

  if (fullName) {
    const data = await User.findOneAndDelete(
      { _id: id },
      { fullName: fullName }
    );

    if (data) {
      return res.json({
        EM: "Cập nhật thành công!",
        EC: 0,
        DT: data,
      });
    } else {
      return res.json({
        EM: "Cập nhật thất bại!",
        EC: -1,
        DT: "",
      });
    }
  } else {
    return;
  }
};

module.exports = { UserRead, UserEdit };
