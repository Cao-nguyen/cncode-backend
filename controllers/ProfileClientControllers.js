const User = require("../models/UserModel");
const News = require("../models/NewsModel");

const ProfileRead = async (req, res) => {
  const username = req.params.username;

  const user = await User.findOne({ username: username }).select(
    "-password -tokenUser"
  );

  if (!user) {
    return res.json({
      EM: "Không tìm thấy người dùng!",
      EC: -1,
      DT: "",
    });
  }

  return res.json({
    EM: "Thành công!",
    EC: 0,
    DT: {
      user,
      huyhieu,
      items,
      follows,
      courses,
    },
  });
};

const PostRead = async (req, res) => {
  const username = req.params.username;

  const news = await News.find({ by: username });

  return res.json({
    EM: "Thành công!",
    EC: 0,
    DT: news,
  });
};

module.exports = {
  ProfileRead,
  PostRead,
};
