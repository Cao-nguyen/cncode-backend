const mongoose = require("mongoose");

const Transaction = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
    content: { type: String },
    money: { type: Number },
    apply: { type: String },
    user1: { type: String },
    user2: { type: String },
    active: { type: String },
    time1: { type: Date },
    time2: { type: Date },
    note: { type: String },
    type: { type: String },
  },
  { timestamps: false }
);

const transaction = mongoose.model("transaction", Transaction);

module.exports = transaction;
