const AskModel = require("../models/AskModel");

const AskCreate = async (req, res) => {
  const { id, question } = req.body;

  const data = new AskModel({
    question: question,
    authorId: id,
  });

  if (data) {
    data.save();
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
  const data = await AskModel.find().sort({ createdAt: -1 });

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

module.exports = { AskCreate, AskRead };
