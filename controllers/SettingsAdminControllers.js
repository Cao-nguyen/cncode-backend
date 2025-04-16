const Banner = require("../models/BannerModel");

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

module.exports = {
  SettingsBannerUpload,
  SettingsBannerRead,
};
