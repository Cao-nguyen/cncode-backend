const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Course = new Schema({
  course: [
    {
      idCourse: { type: String },
      time: { type: Date, default: Date.now() },
    },
  ],
});

module.exports = mongoose.model("course", Course);
