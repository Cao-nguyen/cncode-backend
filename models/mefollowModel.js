const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const FollowSchema = new Schema(
  {
    followerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    }, // Người theo dõi
    followingId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    }, // Người được theo dõi
    followedAt: { type: Date, default: Date.now }, // Thời gian theo dõi
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("meFollows", FollowSchema);
