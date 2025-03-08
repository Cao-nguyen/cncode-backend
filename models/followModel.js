const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Follow = new Schema({
  follow: [
    {
      name: { type: String },
      time: { type: Date, default: Date.now() },
    },
  ],
});

module.exports = mongoose.model("follow", Follow);
