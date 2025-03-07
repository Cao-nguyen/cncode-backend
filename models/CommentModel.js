const mongoose = require("mongoose");

const commentShema = new mongoose.Schema({
  idPost: {
    type: String,
  },
  comments: {
    name: { type: String },
    comment: { type: String },
    time: {
      type: Date,
      default: Date.now(),
    },
    reply: [
      {
        name: { type: String },
        comment: { type: String },
        time: { type: Date, default: Date.now() },
      },
    ],
  },
});

const comment = mongoose.model("comment", commentShema);

module.exports = comment;
