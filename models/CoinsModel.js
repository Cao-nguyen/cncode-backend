const mongoose = require("mongoose");

const CoinsSchema = new mongoose.Schema({
  authorId: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
  coins: { type: Number },
  createdAt: { type: Date, default: Date.now, expires: 86400 },
});

module.exports = mongoose.model("coins", CoinsSchema);
