const Chat = require("../models/ChatModel");

const ChatCreate = async (req, res) => {
  const { id, receivedId, chat } = req.body;
  const io = req.app.get("io");

  const newReceivedId = receivedId || null;

  const data = new Chat({
    sendId: id,
    receivedId: newReceivedId,
    chat: chat,
    isRead: false,
  });

  await data.save();

  if (data) {
    io.emit("pushChat");
    return res.json({
      EM: "Tin nhắn của bạn đã được gửi thành công! Bạn vui lòng chờ phản hồi trong vòng 1 giờ nhé!",
      EC: 0,
      DT: data,
    });
  } else {
    return res.json({ EM: "Thất bại", EC: -1, DT: "" });
  }
};

const ChatRead = async (req, res) => {
  const data = await Chat.find()
    .populate("sendId", "fullName avatar")
    .populate("receivedId", "fullName avatar");

  if (data) {
    return res.json({
      EM: "Thành công",
      EC: 0,
      DT: data,
    });
  } else {
    return res.json({ EM: "Thất bại", EC: -1, DT: "" });
  }
};

const ChatDelete = async (req, res) => {
  const { id } = req.body;
  const io = req.app.get("io");

  const data = await Chat.deleteMany({
    $or: [{ sendId: id }, { receivedId: id }],
  });

  if (data) {
    io.emit("win");
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

module.exports = {
  ChatCreate,
  ChatRead,
  ChatDelete,
};
