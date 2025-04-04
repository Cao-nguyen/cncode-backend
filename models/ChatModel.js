const mongoose = require("mongoose");

const ChatSchema = new mongoose.Schema(
  {
    sendId: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
    receivedId: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
    chat: { type: String },
    isRead: { type: String },
    createdAt: {
      type: Date,
      default: Date.now,
      expires: 10 * 24 * 60 * 60,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("chat", ChatSchema);
