const mongoose = require("mongoose");

const thongbaoSchema = new mongoose.Schema({
  user_one: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
  user_two: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
  content: { type: String },
  others: { type: String },
  createdAt: { type: Date, default: Date.now, expires: 60 * 60 * 15 },
  isRead: { type: Boolean, default: false },
});

const thongbao = mongoose.model("thongbao", thongbaoSchema);

module.exports = thongbao;
