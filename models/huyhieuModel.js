const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const BadgeSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    }, // Người nhận huy hiệu
    badges: [
      {
        img: { type: String }, // Ảnh huy hiệu
        name: { type: String }, // Tên huy hiệu
        description: { type: String }, // Mô tả huy hiệu
        receivedAt: { type: Date, default: Date.now }, // Thời gian nhận huy hiệu
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("badges", BadgeSchema);
