const mongoose = require("mongoose");

const ForumSchema = new mongoose.Schema({
  name: { type: String },
  description: { type: String },
  avatar: { type: String },
  forum_law: { type: String },
  allow_chat: { type: Boolean },
  allow_vote: { type: Boolean },
  member: [
    {
      _id: false,
      member_id: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
    },
  ],
  chat: [
    {
      chat_id: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
      chat_reply: [
        {
          chat_reply_id: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
          chat_reply_content: { type: String },
        },
      ],
      chat_like: [
        {
          like: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
        },
      ],
      chat_content: { type: String },
      chat_time: {
        type: Date,
        default: Date.now(),
        index: { expires: 60 * 60 * 24 * 15 },
      },
    },
  ],
  forum_time: { type: Date, default: Date.now() },
  forum_update: { type: Date, default: Date.now() },
});

module.exports = mongoose.model("forum", ForumSchema);
