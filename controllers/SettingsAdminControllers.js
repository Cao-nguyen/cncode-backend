const Banner = require("../models/BannerModel");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

const SettingsBannerUpload = async (req, res) => {
  const { avatar, link } = req.body;
  const io = req.app.get("io");

  const data = new Banner({
    avatar,
    link,
  });

  if (data) {
    await data.save();
    io.emit("pushBanner");
    return res.json({ EM: "Thành công!", EC: 0, DT: data });
  } else {
    return res.json({ EM: "Thất bại!", EC: -1, DT: "" });
  }
};

const SettingsBannerRead = async (req, res) => {
  const data = await Banner.find().sort({ createdAt: -1 });

  if (data) {
    return res.json({ EM: "Thành công!", EC: 0, DT: data });
  } else {
    return res.json({ EM: "Thất bại!", EC: -1, DT: "" });
  }
};

const SettingsBannerDelete = async (req, res) => {
  const { publicId, idPost } = req.body;
  const io = req.app.get("io");

  await cloudinary.uploader.destroy(publicId);

  const deletedBanner = await Banner.findByIdAndDelete(idPost);

  if (!deletedBanner) {
    return res.json({
      EM: "Không tìm thấy bản ghi cần xoá!",
      EC: -1,
      DT: "",
    });
  } else {
    io.emit("pushBanner");
    return res.json({
      EM: "Xoá banner thành công!",
      EC: 0,
      DT: "",
    });
  }
};

module.exports = {
  SettingsBannerUpload,
  SettingsBannerRead,
  SettingsBannerDelete,
};
