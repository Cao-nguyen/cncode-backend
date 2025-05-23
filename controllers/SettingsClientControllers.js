const User = require("../models/UserModel");
const bcrypt = require("bcryptjs");
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
      { username: username },
      { new: true }
    );

    if (data) {
      return res.json({
        EM: "Cập nhật thành công!",
        EC: 0,
        DT: {
          fullName: data.fullName,
          username: data.username,
          role: data.role,
          id: data._id,
          coins: data.coins,
          streak: data.streak,
        },
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

const UserEditZalo = async (req, res) => {
  const { id, zalo } = req.body;
  const io = req.app.get("io");

  const link = `https://zalo.me/${zalo}`;

  const data = await User.findOneAndUpdate(
    { _id: id, "mxh.name": "zalo" },
    { $set: { "mxh.$.link": link } },
    { new: true }
  );

  if (!data) {
    await User.findOneAndUpdate(
      { _id: id },
      { $push: { mxh: { name: "zalo", link: link } } },
      { new: true }
    );

    const newData = await User.findOne({ _id: id }).select("mxh");
    io.emit("changeZalo", newData);

    return res.json({
      EM: "Cập nhật thành công!",
      EC: 0,
      DT: data,
    });
  }

  const newData = await User.findOne({ _id: id }).select("mxh");
  io.emit("changeZalo", newData);

  return res.json({
    EM: "Cập nhật thành công!",
    EC: 0,
    DT: data,
  });
};

const UserEditFacebook = async (req, res) => {
  const { id, facebook } = req.body;

  const data = await User.findOneAndUpdate(
    { _id: id, "mxh.name": "facebook" },
    { $set: { "mxh.$.link": facebook } },
    { new: true }
  );

  if (!data) {
    await User.findOneAndUpdate(
      { _id: id },
      { $push: { mxh: { name: "facebook", link: facebook } } },
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

const UserEditTiktok = async (req, res) => {
  const { id, tiktok } = req.body;

  const data = await User.findOneAndUpdate(
    { _id: id, "mxh.name": "tiktok" },
    { $set: { "mxh.$.link": tiktok } },
    { new: true }
  );

  if (!data) {
    await User.findOneAndUpdate(
      { _id: id },
      { $push: { mxh: { name: "tiktok", link: tiktok } } },
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

const UserEditYoutube = async (req, res) => {
  const { id, youtube } = req.body;

  const data = await User.findOneAndUpdate(
    { _id: id, "mxh.name": "youtube" },
    { $set: { "mxh.$.link": youtube } },
    { new: true }
  );

  if (!data) {
    await User.findOneAndUpdate(
      { _id: id },
      { $push: { mxh: { name: "youtube", link: youtube } } },
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

const UserEditPassword = async (req, res) => {
  const { id, oldPassword, password } = req.body;

  const user = await User.findOne({ _id: id });

  const checkPassword = await bcrypt.compare(oldPassword, user.password);

  if (!checkPassword) {
    return res.json({
      EM: "Mật khẩu không chính xác!",
      EC: 0,
      DT: data,
    });
  } else {
    const hashedPassword = await bcrypt.hash(password, 10);

    const data = await User.findOneAndUpdate(
      { _id: id },
      {
        password: hashedPassword,
        createdAt: Date.now(),
      }
    );

    if (data) {
      return res.json({
        EM: "Cập nhật mật khẩu mới thành công",
        EC: 0,
        DT: data,
      });
    } else {
      return res.json({
        EM: "Cập nhật mật khẩu mới thất bại",
        EC: -1,
        DT: "",
      });
    }
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
  UserEditZalo,
  UserEditFacebook,
  UserEditTiktok,
  UserEditYoutube,
  UserEditPassword,
};
