const mongoose = require("mongoose");

const ShopSchema = new mongoose.Schema(
  {
    name: { type: String },
    price: { type: Number },
    img: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("shops", ShopSchema);
