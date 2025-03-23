const { findOneAndUpdate } = require("../models/AskModel");
const AskModel = require("../models/AskModel");

const AskReplyCreate = async (req, res) => {
  const { idPush, id, reply } = req.body;

  const io = req.app.get("io");

  const data = await AskModel.findOneAndUpdate(
    { _id: idPush },
    {
      $push: {
        answer: { answer: reply, authorId: id },
      },
    },
    { new: true }
  );

  if (data) {
    const newData = await AskModel.find()
      .sort({ createdAt: -1 })
      .populate("authorId", "fullName avatar role")
      .populate("answer.authorId", "fullName avatar role _id");

    io.emit("pushQuestion", newData);

    return res.json({
      EM: "Đã gửi phản hồi thành công!",
      EC: 0,
      DT: data,
    });
  } else {
    return res.json({
      EM: "Trả lời câu hỏi thất bại!",
      EC: -1,
      DT: "",
    });
  }
};

const AskCreate = async (req, res) => {
  const { id, question } = req.body;

  const io = req.app.get("io");

  const data = new AskModel({
    question: question,
    authorId: id,
  });

  if (data) {
    await data.save();

    const newData = await AskModel.find()
      .sort({ createdAt: -1 })
      .populate("authorId", "fullName avatar role")
      .populate("answer.authorId", "fullName avatar role _id");

    io.emit("pushQuestion", newData);
    return res.json({
      EM: "Đã gửi câu hỏi thành công!",
      EC: 0,
      DT: data,
    });
  } else {
    return res.json({
      EM: "Gửi câu hỏi thất bại!",
      EC: -1,
      DT: "",
    });
  }
};

const AskRead = async (req, res) => {
  const data = await AskModel.find()
    .sort({ createdAt: -1 })
    .populate("authorId", "fullName avatar role _id")
    .populate("answer.authorId", "fullName avatar role _id");

  if (data) {
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

module.exports = { AskCreate, AskRead, AskReplyCreate };
