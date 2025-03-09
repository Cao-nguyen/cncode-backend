const User = require("../models/UserModel");
const Huyhieu = require("../models/huyhieuModel");
const Item = require("../models/itemModel");
const Follow = require("../models/followModel");
const Course = require("../models/courseModel");
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

  const huyhieu = await Huyhieu.findOne({ _id: user.huyhieuId });
  const items = await Item.find({ _id: user.itemId });
  const follows = await Follow.find({ _id: user.followId });
  const courses = await Course.find({ _id: user.courseId });

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
