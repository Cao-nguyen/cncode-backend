const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    postId: { type: mongoose.Schema.Types.ObjectId },
    postType: { type: String, enum: ["blog", "news"] },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
    comment: { type: String },
    likes: [
      {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
        likedAt: { type: Date, default: Date.now },
      },
    ],
    replies: [
      {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
        comment: { type: String },
        likes: [
          {
            userId: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
            likedAt: { type: Date, default: Date.now },
          },
        ],
        createdAt: { type: Date, default: Date.now },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Comment = mongoose.model("comment", commentSchema);

module.exports = Comment;
