const News = require("../models/NewsModel");
const Comment = require("../models/CommentModel");

const NewsRead = async (req, res) => {
  try {
    const news = await News.find({
      deleted: false,
      show: true,
      isChecked: true,
    })
      .sort({ createdAt: -1 })
      .populate("authorId", "fullName");

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
  const { userId, chat, slug, tagName, idChat } = req.body;

  if (tagName === null) {
    const newComment = Comment.create({
      postId: slug,
      postType: "news",
      userId: userId,
      comment: chat,
    });

    try {
      let savedComment = await newComment.save();

      if (savedComment) {
        const commentData = await Comment.findById(savedComment._id);
        io.emit("pushComment");

        return res.json({
          EM: "Đã gửi bình luận thành công!",
          EC: 0,
          DT: commentData,
        });
      } else {
        return res.json({
          EM: "Đã gửi bình luận thất bại!",
          EC: -1,
          DT: "",
        });
      }
    } catch (error) {
      return res.json({
        EM: "Có lỗi xảy ra khi lưu bình luận.",
        EC: -1,
        DT: error.message,
      });
    }
  } else {
    try {
      const updatedComment = await Comment.findOneAndUpdate(
        { _id: idChat },
        {
          $push: {
            replies: {
              userId: userId,
              comment: chat,
              likes: [],
              createdAt: Date.now(),
            },
          },
        },
        { new: true }
      );

      if (updatedComment) {
        io.emit("pushCommentReply");
        return res.json({
          EM: "Đã gửi bình luận thành công!",
          EC: 0,
          DT: updatedComment,
        });
      } else {
        return res.json({
          EM: "Bình luận cần phản hồi không tồn tại.",
          EC: -1,
          DT: "",
        });
      }
    } catch (error) {
      return res.json({
        EM: "Có lỗi xảy ra khi thêm phản hồi.",
        EC: -1,
        DT: error.message,
      });
    }
  }
};

const CommentRead = async (req, res) => {
  const { slug } = req.params;

  const data = await Comment.find({
    postId: slug,
  })
    .populate("userId", "fullName")
    .populate({
      path: "replies.userId",
      select: "fullName",
    })
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
