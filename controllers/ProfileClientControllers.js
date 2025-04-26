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

module.exports = {
  ProfileRead,
  PostRead,
};
