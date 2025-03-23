const User = require("../models/UserModel");
const meHuyhieu = require("../models/mehuyhieuModel");
const meItem = require("../models/meitemModel");
const meFollow = require("../models/mefollowModel");
const meCourse = require("../models/mecourseModel");
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

  const huyhieu = await meHuyhieu.findOne({ _id: user.huyhieuId });
  const items = await meItem.find({ _id: user.itemId });
  const follows = await meFollow.find({ _id: user.followId });
  const courses = await meCourse.find({ _id: user.courseId });

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
