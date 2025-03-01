const mongoose = require("mongoose");

const MemberSchema = new mongoose.Schema(
  {
    content: { type: String },
  },
  { timestamps: true }
);

const member = mongoose.model("member", MemberSchema);

module.exports = member;
