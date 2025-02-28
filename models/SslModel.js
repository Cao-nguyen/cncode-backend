const mongoose = require("mongoose");

const SslSchema = new mongoose.Schema(
  {
    content: { type: String },
  },
  { timestamps: true }
);

const ssl = mongoose.model("ssl", SslSchema);

module.exports = ssl;
