const mongoose = require("mongoose");

const GrateSchema = new mongoose.Schema(
  {
    rating: { type: Number },
    comment: { type: String },
    authorId: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("grate", GrateSchema);
