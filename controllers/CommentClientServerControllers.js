const News = require("../models/NewsModel");

const NewsCommentCreate = async (req, res) => {
  const { id, currentId, idPost, content, replyContent } = req.body;
  const io = req.app.get("io");

  if (!content) {
    const newReplyContent = await replyContent.trim();

    const data = await News.findOneAndUpdate(
      { _id: idPost },
      {
        $push: {
          comments: {
            userComment: id,
            comment: newReplyContent,
            commentedAt: Date.now(),
            parrentId: currentId,
          },
        },
      }
    );

    if (data) {
      const newData = await News.findOne({ _id: idPost })
        .populate("authorId", "fullName")
        .populate("like.userLike", "fullName")
        .populate("comments.userComment", "fullName avatar");

      newData.comments.sort((a, b) => b.commentedAt - a.commentedAt);

      io.emit("pushComment", newData);
      return res.json({ EM: "Bình luận thành công!", EC: 0, DT: data });
    } else {
      return res.json({ EM: "Có lỗi xảy ra", EC: -1, DT: "" });
    }
  } else {
    const newContent = await content.trim();

    const data = await News.findOneAndUpdate(
      { _id: idPost },
      {
        $push: {
          comments: {
            userComment: id,
            comment: newContent,
            commentedAt: Date.now(),
            parrentId: null,
          },
        },
      }
    );

    if (data) {
      const newData = await News.findOne({ _id: idPost })
        .populate("authorId", "fullName")
        .populate("like.userLike", "fullName")
        .populate("comments.userComment", "fullName avatar");

      newData.comments.sort((a, b) => b.commentedAt - a.commentedAt);

      io.emit("pushComment", newData);
      return res.json({ EM: "Bình luận thành công!", EC: 0, DT: data });
    } else {
      return res.json({ EM: "Có lỗi xảy ra", EC: -1, DT: "" });
    }
  }
};

module.exports = {
  NewsCommentCreate,
};
