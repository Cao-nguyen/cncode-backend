const Chat = require("../models/ChatModel");

const ChatCreate = async (req, res) => {
  const { id, chat } = req.body;
  const io = req.app.get("io");

  const data = new Chat({
    sendId: id,
    receivedId: null,
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
  const data = await Chat.find().populate("sendId", "fullName");

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

module.exports = {
  ChatCreate,
  ChatRead,
};
