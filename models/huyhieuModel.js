const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Huyhieu = new Schema({
  huyhieu: [
    {
      img: { type: String },
      time: { type: Date, default: Date.now() },
    },
  ],
});

module.exports = mongoose.model("huyhieu", Huyhieu);
