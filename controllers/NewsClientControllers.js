const News = require("../models/NewsModel");
const Comment = require("../models/CommentModel");
const { report } = require("..");

const NewsRead = async (req, res) => {
  try {
    const news = await News.find({
      deleted: false,
      show: true,
      isChecked: true,
    }).sort({ createdAt: -1 });

    return res.json({
      EC: 0,
      EM: "Thành công",
      DT: news,
    });
  } catch {
    return res.json({
      EC: -1,
      EM: "Thất bại",
      DT: "",
    });
  }
};

const NewsLikeCreate = async (req, res) => {
  try {
    const { fullName, slug } = req.body;

    const news = await News.findOneAndUpdate(
      { slug: slug },
      {
        $push: {
          emotion: {
            name: fullName,
            emotionAt: Date.now(),
          },
        },
      },
      { new: true }
    );

    if (news) {
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
    const { fullName, slug } = req.body;

    const news = await News.findOneAndUpdate(
      { slug: slug },
      {
        $pull: {
          emotion: { name: fullName },
        },
      },
      { new: true }
    );

    if (news) {
      return res.json({
        EC: 0,
        EM: "Unlike thành công",
        DT: news,
      });
    }
  } catch (error) {
    return res.json({
      EC: -1,
      EM: "Có lỗi xảy ra",
      DT: "",
    });
  }
};

const CommentCreate = async (req, res) => {
  const io = req.app.get("io");
  const { fullName, chat, slug, tagName, idChat } = req.body;

  if (tagName === null) {
    const data = new Comment({
      comments: {
        name: fullName,
        comment: chat,
        report: 0,
        like: [],
        reply: [],
      },
      isPost: slug,
    });

    let response = await data.save();

    if (response) {
      const newComment = await Comment.findById(response._id);
      io.emit("pushComment", newComment);

      return res.json({
        EM: "Đã gửi bình luận thành công!",
        EC: 0,
        DT: newComment,
      });
    } else {
      return res.json({
        EM: "Đã gửi bình luận thất bại!",
        EC: -1,
        DT: "",
      });
    }
  } else {
    const data = await Comment.findOneAndUpdate(
      { _id: idChat },
      {
        $push: {
          "comments.reply": {
            name: fullName,
            comment: chat,
            report: 0,
          },
        },
      },
      { new: true }
    );

    if (data) {
      io.emit("pushCommentReply");

      return res.json({
        EM: "Đã gửi bình luận thành công!",
        EC: 0,
        DT: data,
      });
    } else {
      return res.json({
        EM: "Đã gửi bình luận thất bại!",
        EC: -1,
        DT: "",
      });
    }
  }
};

const CommentRead = async (req, res) => {
  const { slug } = req.params;

  const data = await Comment.find({
    isPost: slug,
  }).sort({ "comments.time": -1 });

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
      DT: "",
    });
  }
};

const CommentDelete = async (req, res) => {
  const io = req.app.get("io");

  const { id } = req.body;

  const data = await Comment.findOneAndDelete({ _id: id });

  if (data) {
    io.emit("chatDelete");
    return res.json({
      EM: "Xoá bình luận thành công",
      EC: 0,
      DT: "",
    });
  } else {
    return res.json({
      EM: "Có lỗi xảy ra",
      EC: -1,
      DT: "",
    });
  }
};

const CommentDeleteReply = async (req, res) => {
  const io = req.app.get("io");
  const { idMain, id } = req.body;

  const data = await Comment.findOneAndUpdate(
    { _id: idMain },
    {
      $pull: {
        "comments.reply": {
          _id: id,
        },
      },
    },
    { new: true }
  );

  if (data) {
    io.emit("chatDeleteReply");
    return res.json({
      EM: "Xoá bình luận thành công",
      EC: 0,
      DT: "",
    });
  } else {
    return res.json({
      EM: "Không tìm thấy bình luận chính",
      EC: -1,
      DT: "",
    });
  }
};

const CommentLike = async (req, res) => {
  const io = req.app.get("io");
  const { idMain, id, fullName } = req.body;

  if (!id) {
    const dataLike = await Comment.findOneAndUpdate(
      { _id: idMain },
      {
        $push: {
          "comments.like": {
            nameLike: fullName,
          },
        },
      },
      { new: true }
    );

    if (dataLike) {
      io.emit("like");
      return res.json({
        EM: "Thành công!",
        EC: 0,
        DT: "",
      });
    } else {
      return res.json({
        EM: "Thất bại!",
        EC: -1,
        DT: "",
      });
    }
  } else {
    const dataLike = await Comment.findOneAndUpdate(
      { _id: idMain, "comments.reply._id": id },
      {
        $push: {
          "comments.reply.$.like": { nameLike: fullName },
        },
      },
      { new: true }
    );

    if (dataLike) {
      io.emit("like");
      return res.json({
        EM: "Thành công!",
        EC: 0,
        DT: "",
      });
    } else {
      return res.json({
        EM: "Thất bại!",
        EC: -1,
        DT: "",
      });
    }
  }
};

const CommentUnlike = async (req, res) => {
  const io = req.app.get("io");
  const { idMain, id, fullName } = req.body;

  if (!id) {
    const dataLike = await Comment.findOneAndUpdate(
      { _id: idMain },
      {
        $pull: {
          "comments.like": {
            nameLike: fullName,
          },
        },
      },
      { new: true }
    );

    if (dataLike) {
      io.emit("unlike");
      return res.json({
        EM: "Thành công!",
        EC: 0,
        DT: "",
      });
    } else {
      return res.json({
        EM: "Thất bại!",
        EC: -1,
        DT: "",
      });
    }
  } else {
    const dataLike = await Comment.findOneAndUpdate(
      { _id: idMain, "comments.reply._id": id },
      {
        $pull: {
          "comments.reply.$.like": { nameLike: fullName },
        },
      },
      { new: true }
    );

    if (dataLike) {
      io.emit("unlike");
      return res.json({
        EM: "Thành công!",
        EC: 0,
        DT: "",
      });
    } else {
      return res.json({
        EM: "Thất bại!",
        EC: -1,
        DT: "",
      });
    }
  }
};

module.exports = {
  NewsRead,
  NewsLikeCreate,
  NewsUnlikeCreate,
  CommentCreate,
  CommentRead,
  CommentDelete,
  CommentDeleteReply,
  CommentLike,
  CommentUnlike,
};
