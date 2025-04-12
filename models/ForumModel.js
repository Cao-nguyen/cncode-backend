const mongoose = require("mongoose");

const ForumSchema = new mongoose.Schema({
  name: { type: String },
  description: { type: String },
  member: [
    { member_id: { type: mongoose.Schema.Types.ObjectId, ref: "users" } },
  ],
  chat: [
    {
      chat_name: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
      chat_reply: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
      chat_content: { type: String },
      chat_time: { type: Date, default: Date.now() },
    },
  ],
  forum_time: { type: Date, default: Date.now() },
  forum_update: { type: Date, default: Date.now() },
});

module.exports = mongoose.model("forum", ForumSchema);
