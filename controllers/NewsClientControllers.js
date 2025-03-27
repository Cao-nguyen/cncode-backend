const News = require("../models/NewsModel");

const NewsRead = async (req, res) => {
  try {
    const news = await News.find({
      deleted: false,
      show: true,
      isChecked: true,
    })
      .sort({ createdAt: -1 })
      .populate("authorId", "fullName")
      .populate("like.userLike", "fullName")
      .populate("comments.userComment", "fullName avatar");

    news.forEach((post) => {
      post.comments.sort((a, b) => b.commentedAt - a.commentedAt);
    });

    return res.json({
      EC: 0,
      EM: "Thành công",
      DT: news,
    });
  } catch (error) {
    return res.json({
      EC: -1,
      EM: "Thất bại",
      DT: "",
    });
  }
};

const NewsLikeCreate = async (req, res) => {
  try {
    const { id, idPost } = req.body;
    const io = req.app.get("io");

    const news = await News.findOneAndUpdate(
      { _id: idPost },
      {
        $push: {
          like: {
            userLike: id,
            likedAt: Date.now(),
          },
        },
      },
      { new: true }
    );

    if (news) {
      const newData = await News.findOne({ _id: idPost })
        .populate("authorId", "fullName")
        .populate("like.userLike", "fullName")
        .populate("comments.userComment", "fullName avatar");

      newData.comments.sort((a, b) => b.commentedAt - a.commentedAt);

      io.emit("pushLike", newData);
      return res.json({
        EC: 0,
        EM: "Thành công",
        DT: news,
      });
    }
  } catch (error) {
    return res.json({
      EC: -1,
      EM: "Thất bại",
      DT: "",
    });
  }
};

const NewsUnlikeCreate = async (req, res) => {
  try {
    const { id, idPost } = req.body;
    const io = req.app.get("io");

    const news = await News.findOneAndUpdate(
      { _id: idPost },
      {
        $pull: {
          like: {
            userLike: id,
          },
        },
      },
      { new: true }
    );

    if (news) {
      const newData = await News.findOne({ _id: idPost })
        .populate("authorId", "fullName")
        .populate("like.userLike", "fullName")
        .populate("comments.userComment", "fullName avatar");

      newData.comments.sort((a, b) => b.commentedAt - a.commentedAt);

      io.emit("pushUnlike", newData);
      return res.json({
        EC: 0,
        EM: "Thành công",
        DT: news,
      });
    }
  } catch (error) {
    return res.json({
      EC: -1,
      EM: "Thất bại",
      DT: "",
    });
  }
};

module.exports = {
  NewsRead,
  NewsLikeCreate,
  NewsUnlikeCreate,
};
