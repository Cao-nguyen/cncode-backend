const User = require("../models/UserModel");
const cloudinary = require("cloudinary").v2;
require("dotenv").config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

const UserDeletedImage = async (req, res) => {
  try {
    const { publicId } = req.body;

    if (!publicId) {
      return res.status(400).json({ error: "Thiếu publicId!" });
    }

    // Kiểm tra xem ảnh có tồn tại không
    const imageExists = await cloudinary.api
      .resource(publicId)
      .catch(() => null);

    if (!imageExists) {
      return res.json({
        success: false,
        message: "Ảnh không tồn tại trên Cloudinary!",
      });
    }

    // Nếu ảnh tồn tại, tiến hành xóa
    const result = await cloudinary.uploader.destroy(publicId);
    return res.json({ success: true, message: "Ảnh đã bị xóa!", result });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Lỗi khi xóa ảnh!", details: error.message });
  }
};

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

const UserEditInfo = async (req, res) => {
  const { id, info } = req.body;

  const data = await User.findOneAndUpdate({ _id: id }, { info: info });

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

const UserEditBirthday = async (req, res) => {
  const { id, day, month, year } = req.body;
  const io = req.app.get("io");

  const birthday = `${day} / ${month} / ${year}`;

  const data = await User.findOneAndUpdate({ _id: id }, { birthday: birthday });

  if (data) {
    const newData = await User.findOne({ _id: id }).select("birthday");
    io.emit("changeBirthday", newData);
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

const UserEditTinh = async (req, res) => {
  const { id, tinh } = req.body;

  const data = await User.findOneAndUpdate({ _id: id }, { tinh: tinh });

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

const UserEditSchool = async (req, res) => {
  const { id, school } = req.body;

  const data = await User.findOneAndUpdate({ _id: id }, { school: school });

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

const UserEditAvatar = async (req, res) => {
  const { id, avatar } = req.body;

  const data = await User.findOneAndUpdate({ _id: id }, { avatar: avatar });

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

const UserEditWeb = async (req, res) => {
  const { id, web } = req.body;

  const data = await User.findOneAndUpdate(
    { _id: id, "mxh.name": "web" },
    { $set: { "mxh.$.link": web } },
    { new: true }
  );

  if (!data) {
    await User.findOneAndUpdate(
      { _id: id },
      { $push: { mxh: { name: "web", link: web } } },
      { new: true }
    );

    return res.json({
      EM: "Cập nhật thành công!",
      EC: 0,
      DT: data,
    });
  } else {
    return res.json({
      EM: "Cập nhật thành công!",
      EC: 0,
      DT: data,
    });
  }
};

const UserEditGit = async (req, res) => {
  const { id, git } = req.body;

  const data = await User.findOneAndUpdate(
    { _id: id, "mxh.name": "git" },
    { $set: { "mxh.$.link": git } },
    { new: true }
  );

  if (!data) {
    await User.findOneAndUpdate(
      { _id: id },
      { $push: { mxh: { name: "git", link: git } } },
      { new: true }
    );

    return res.json({
      EM: "Cập nhật thành công!",
      EC: 0,
      DT: data,
    });
  } else {
    return res.json({
      EM: "Cập nhật thành công!",
      EC: 0,
      DT: data,
    });
  }
};

module.exports = {
  UserDeletedImage,
  UserRead,
  UserEditFullName,
  UserEditUsername,
  UserEditInfo,
  UserEditBirthday,
  UserEditTinh,
  UserEditSchool,
  UserEditAvatar,
  UserEditWeb,
  UserEditGit,
};
