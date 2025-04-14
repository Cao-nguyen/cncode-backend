const Banner = require("../models/BannerModel");

const SettingsUpload = async (req, res) => {
  const { avatar, link } = req.body;

  const data = new Banner({
    avatar,
    link,
  });

  if (data) {
    await data.save();
    return res.json({ EM: "Thành công!", EC: 0, DT: data });
  } else {
    return res.json({ EM: "Thất bại!", EC: -1, DT: "" });
  }
};

module.exports = {
  SettingsUpload,
};
