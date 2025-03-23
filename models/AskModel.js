const mongoose = require("mongoose");

const AskShema = new mongoose.Schema(
  {
    question: { type: String },
    authorId: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
    answer: [
      {
        answer: { type: String },
        authorId: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("ask", AskShema);
