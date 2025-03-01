const mongoose = require("mongoose");

const UseSchema = new mongoose.Schema(
  {
    content: { type: String },
  },
  { timestamps: true }
);

const use = mongoose.model("use", UseSchema);

module.exports = use;
