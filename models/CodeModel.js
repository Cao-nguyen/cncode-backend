const mongoose = require("mongoose");

const CodeSchema = new mongoose.Schema({
  email: { type: String },
  code: { type: String },
  expiresAt: { type: Date }, // Thêm thời gian hết hạn
});

module.exports = mongoose.model("Code", CodeSchema);
