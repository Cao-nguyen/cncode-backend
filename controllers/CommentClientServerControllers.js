const News = require("../models/NewsModel");
const Blog = require("../models/BlogModel");

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
      io.emit("pushComment");
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
      io.emit("pushComment");
      return res.json({ EM: "Bình luận thành công!", EC: 0, DT: data });
    } else {
      return res.json({ EM: "Có lỗi xảy ra", EC: -1, DT: "" });
    }
  }
};

const NewsCommentDelete = async (req, res) => {
  const { idPost, idPostDelete, parrentId } = req.body;
  const io = req.app.get("io");

  if (parrentId === null) {
    const data = await News.findOneAndUpdate(
      { _id: idPost },
      {
        $pull: {
          comments: {
            $or: [{ _id: idPostDelete }, { parrentId: idPostDelete }],
          },
        },
      }
    );

    if (data) {
      io.emit("deleteComment");
      return res.json({ EM: "Thành công", EC: 0, DT: data });
    } else {
      return res.json({ EM: "Thất bại", EC: -1, DT: "" });
    }
  } else {
    const data = await News.findOneAndUpdate(
      { _id: idPost },
      {
        $pull: {
          comments: {
            _id: idPostDelete,
          },
        },
      }
    );

    if (data) {
      io.emit("deleteComment");
      return res.json({ EM: "Thành công", EC: 0, DT: data });
    } else {
      return res.json({ EM: "Thất bại", EC: -1, DT: "" });
    }
  }
};

const BlogCommentCreate = async (req, res) => {
  const { id, currentId, idPost, content, replyContent } = req.body;
  const io = req.app.get("io");

  if (!content) {
    const newReplyContent = await replyContent.trim();

    const data = await Blog.findOneAndUpdate(
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
      io.emit("pushComment");
      return res.json({ EM: "Bình luận thành công!", EC: 0, DT: data });
    } else {
      return res.json({ EM: "Có lỗi xảy ra", EC: -1, DT: "" });
    }
  } else {
    const newContent = await content.trim();

    const data = await Blog.findOneAndUpdate(
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
      io.emit("pushComment");
      return res.json({ EM: "Bình luận thành công!", EC: 0, DT: data });
    } else {
      return res.json({ EM: "Có lỗi xảy ra", EC: -1, DT: "" });
    }
  }
};

const BlogCommentDelete = async (req, res) => {
  const { idPost, idPostDelete, parrentId } = req.body;
  const io = req.app.get("io");

  if (parrentId === null) {
    const data = await Blog.findOneAndUpdate(
      { _id: idPost },
      {
        $pull: {
          comments: {
            $or: [{ _id: idPostDelete }, { parrentId: idPostDelete }],
          },
        },
      }
    );

    if (data) {
      io.emit("deleteComment");
      return res.json({ EM: "Thành công", EC: 0, DT: data });
    } else {
      return res.json({ EM: "Thất bại", EC: -1, DT: "" });
    }
  } else {
    const data = await Blog.findOneAndUpdate(
      { _id: idPost },
      {
        $pull: {
          comments: {
            _id: idPostDelete,
          },
        },
      }
    );

    if (data) {
      io.emit("deleteComment");
      return res.json({ EM: "Thành công", EC: 0, DT: data });
    } else {
      return res.json({ EM: "Thất bại", EC: -1, DT: "" });
    }
  }
};

module.exports = {
  NewsCommentCreate,
  NewsCommentDelete,
  BlogCommentCreate,
  BlogCommentDelete,
};
