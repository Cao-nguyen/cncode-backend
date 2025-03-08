const mongoose = require("mongoose");

const commentShema = new mongoose.Schema({
  isPost: {
    type: String,
  },
  comments: {
    name: { type: String },
    comment: { type: String },
    time: {
      type: Date,
      default: Date.now(),
    },
    like: [
      {
        nameLike: { type: String },
        timeLink: { type: Date, default: Date.now() },
      },
    ],
    reply: [
      {
        name: { type: String },
        comment: { type: String },
        time: { type: Date, default: Date.now() },
        like: [
          {
            nameLike: { type: String },
            timeLink: { type: Date, default: Date.now() },
          },
        ],
      },
    ],
  },
});

const comment = mongoose.model("comment", commentShema);

module.exports = comment;
