const Forum = require("../models/ForumModel");

const ForumRead = async (req, res) => {
  const forum = await Forum.find()
    .populate({
      path: "chat.chat_id",
      select: "avatar fullName",
    })
    .populate({
      path: "chat.chat_reply.chat_reply_id",
      select: "avatar fullName",
    });

  if (forum) {
    return res.json({ EM: "Thành công!", EC: 0, DT: forum });
  } else {
    return res.json({ EM: "Thất bại!", EC: -1, DT: "" });
  }
};

const ForumJoin = async (req, res) => {
  const { showOn, userId } = req.body;
  const io = req.app.get("io");

  const data = await Forum.findOneAndUpdate(
    { _id: showOn },
    { $addToSet: { member: { member_id: userId } } }
  );

  if (data) {
    io.emit("addGroup");
    const newData = await Forum.findOne({ _id: showOn });
    return res.json({ EM: "Đã tham gia nhóm thành công!", EC: 0, DT: newData });
  } else {
    return res.json({
      EM: "Đã xảy ra lỗi, không thể tham gia vào nhóm!",
      EC: -1,
      DT: "",
    });
  }
};

const ForumOut = async (req, res) => {
  const { idGroup, userId } = req.body;
  const io = req.app.get("io");

  const data = await Forum.findOneAndUpdate(
    { _id: idGroup },
    { $pull: { member: { member_id: userId } } }
  );

  if (data) {
    io.emit("outGroup");
    const newData = await Forum.findOne({ _id: idGroup });
    return res.json({ EM: "Đã rời nhóm thành công!", EC: 0, DT: newData });
  } else {
    return res.json({
      EM: "Đã xảy ra lỗi, không thể rời vào nhóm!",
      EC: -1,
      DT: "",
    });
  }
};

const ForumChat = async (req, res) => {
  const { tab, userId, reply, replyContent, chat } = req.body;
  const io = req.app.get("io");

  const data = await Forum.findOneAndUpdate(
    { _id: tab },
    {
      $push: {
        chat: {
          chat_id: userId,
          chat_reply: {
            chat_reply_id: !reply ? null : reply,
            chat_reply_content: !replyContent ? null : replyContent,
          },
          chat_content: chat,
          chat_time: Date.now(),
        },
      },
    }
  );

  if (data) {
    io.emit("pushChat");
    return res.json({ EM: "Thành công!", EC: 0, DT: data });
  } else {
    return res.json({ EM: "Thất bại!", EC: -1, DT: "" });
  }
};

module.exports = { ForumRead, ForumJoin, ForumChat, ForumOut };
