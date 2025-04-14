const mongoose = require("mongoose");

const BannerSchema = new mongoose.Schema(
  {
    avatar: { type: String },
    link: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("banner", BannerSchema);
