const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ItemSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    }, // Người sở hữu vật phẩm
    items: [
      {
        name: { type: String }, // Tên vật phẩm
        quantity: { type: Number, default: 1 }, // Số lượng vật phẩm
        description: { type: String }, // Mô tả vật phẩm
        acquiredAt: { type: Date, default: Date.now }, // Thời gian nhận vật phẩm
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("meItems", ItemSchema);
