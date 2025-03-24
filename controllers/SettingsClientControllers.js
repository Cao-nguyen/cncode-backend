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

const UserEditFullName = async (req, res) => {
  const { id, fullName } = req.body;

  const data = await User.findOneAndUpdate({ _id: id }, { fullName: fullName });

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
};

const UserEditUsername = async (req, res) => {
  const { id, username } = req.body;
  const isUsername = await User.findOne({ username });
  if (isUsername) {
    return res.json({
      EM: "Username đã tồn tại",
      EC: -1,
      DT: "",
    });
  } else {
    const data = await User.findOneAndUpdate(
      { _id: id },
      { username: username }
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
  }
};

module.exports = { UserRead, UserEditFullName, UserEditUsername };
