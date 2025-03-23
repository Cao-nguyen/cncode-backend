const mongoose = require("mongoose");

const AskSchema = new mongoose.Schema(
  {
    question: { type: String },
    authorId: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
    answer: [
      {
        content: { type: String },
        authorId: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Ask = mongoose.model("ask", AskSchema);

module.exports = Ask;
