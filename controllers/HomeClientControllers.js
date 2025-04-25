const Blog = require("../models/BlogModel");
const News = require("../models/NewsModel");
const Grate = require("../models/GrateModel");
const Coins = require("../models/CoinsModel");
const User = require("../models/UserModel");

const BlogRead = async (req, res) => {
  const data = await Blog.find({
    deleted: false,
    active: "chapnhan",
    show: true,
    isChecked: true,
  })
    .sort({ createdAt: -1 })
    .limit(3)
    .populate("authorId", "fullName avatar");

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

const NewsRead = async (req, res) => {
  const data = await News.find({ deleted: false, show: true, isChecked: true })
    .sort({ createdAt: -1 })
    .limit(3)
    .populate("authorId", "fullName");

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

const GrateCreate = async (req, res) => {
  const { id, rating, comment } = req.body;
  const io = req.app.get("io");

  const data = new Grate({
    rating,
    comment,
    authorId: id,
  });

  if (data) {
    await data.save();
    io.emit("pushGrate");
    return res.json({
      EM: "Đã gửi đánh giá thành công!",
      EC: 0,
      DT: data,
    });
  } else {
    return res.json({
      EM: "Đã gửi đánh giá thất bại!",
      EC: 0,
      DT: data,
    });
  }
};

const GrateRead = async (req, res) => {
  const data = await Grate.find()
    .populate("authorId", "avatar fullName")
    .sort({ createdAt: -1 });

  if (data) {
    return res.json({
      EM: "Thành công!",
      EC: 0,
      DT: data,
    });
  } else {
    return res.json({
      EM: "Thất bại!",
      EC: 0,
      DT: data,
    });
  }
};

const GrateDelete = async (req, res) => {
  const { id } = req.body;
  const io = req.app.get("io");

  const data = await Grate.findOneAndDelete({
    _id: id,
  });

  if (data) {
    io.emit("pushGrate");
    return res.json({
      EM: "Đã xoá đánh giá thành công!",
      EC: 0,
      DT: data,
    });
  } else {
    return res.json({
      EM: "Đã xoá đánh giá thất bại!",
      EC: 0,
      DT: "",
    });
  }
};

const UserPointCreate = async (req, res) => {
  const { id } = req.body;
  const io = req.app.get("io");

  const user = await User.findById(id);
  if (!user) {
    return res.status(404).json({
      EM: "Không tìm thấy người dùng.",
      EC: 1,
      DT: null,
    });
  }

  let newCoins = 0;
  let newStreak = 1;

  if (user.streak === 360) {
    newCoins = 1000;
    newStreak = 1;
  } else {
    newCoins = Math.floor(Math.random() * 16);
    newStreak = user.streak + 1;
  }

  user.coins += newCoins;
  user.streak = newStreak;
  await user.save();

  const data = new Coins({
    authorId: id,
    coins: newCoins,
    createdAt: Date.now(),
  });
  await data.save();

  io.emit("pushUserPoint");

  return res.json({
    EM: "Thành công!",
    EC: 0,
    DT: user,
  });
};

const UserPointRead = async (req, res) => {
  const data = await Coins.find()
    .sort({ createdAt: -1 })
    .populate("authorId", "_id fullName");

  const user = await User.find().select("_id streak");

  if (data) {
    return res.json({
      EM: "Thành công!",
      EC: 0,
      DT: { data, user },
    });
  } else {
    return res.json({
      EM: "Thất bại!",
      EC: -1,
      DT: "",
    });
  }
};

module.exports = {
  BlogRead,
  NewsRead,
  GrateCreate,
  GrateRead,
  GrateDelete,
  UserPointCreate,
  UserPointRead,
};
