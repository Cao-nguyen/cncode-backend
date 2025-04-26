const User = require("../models/UserModel");
const Blog = require("../models/BlogModel");

const ProfileRead = async (req, res) => {
  const username = req.params.username;

  const user = await User.findOne({ username: username })
    .select("-password -tokenUser")
    .populate({
      path: "gift.giftId",
      select: "name price img",
    });

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
    },
  });
};

const PostRead = async (req, res) => {
  const username = req.params.username;

  const user = await User.findOne({ username: username });

  const blog = await Blog.find({ authorId: user._id }).sort({ createdAt: -1 });

  if (blog && blog.length > 0) {
    return res.json({
      EM: "Thành công!",
      EC: 0,
      DT: blog,
    });
  } else {
    return res.json({
      EM: "Không tìm thấy bài viết!",
      EC: -1,
      DT: "",
    });
  }
};

const ChangeEdit = async (req, res) => {
  const { userId, id, count, money } = req.body;
  const io = req.app.get("io");

  const user = await User.findById(userId);

  let removed = 0;
  user.gift = user.gift.filter((item) => {
    if (item?.giftId?._id?.toString() === id && removed < count) {
      removed++;
      return false;
    }
    return true;
  });

  const bonus = Math.floor(money * 0.9);
  user.coins = (user.coins || 0) + bonus;

  const data = await user.save();

  if (data) {
    io.emit("changeItem");
    return res.json({
      EM: "Đã đổi vật phẩm thành công!",
      EC: 0,
      DT: data,
    });
  } else {
    return res.json({
      EM: "Đã đổi vật phẩm thất bại!",
      EC: -1,
      DT: "",
    });
  }
};

module.exports = {
  ProfileRead,
  PostRead,
  ChangeEdit,
};
