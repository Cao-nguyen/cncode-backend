const mongoose = require("mongoose");

const LessonSchema = new mongoose.Schema({
  title: { type: String },
  type: {
    type: String,
    enum: ["video", "text", "document", "quiz"],
  },
  content: { type: String },
  order: { type: Number },
});

const CategorySchema = new mongoose.Schema({
  title: { type: String },
  order: { type: Number },
  lessons: [LessonSchema],
});

const CourseSchema = new mongoose.Schema(
  {
    title: { type: String },
    description: { type: String },
    thumbnail: { type: String },
    categories: [CategorySchema],
    authorId: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
  },
  { timestamps: true }
);

const Course = mongoose.model("course", CourseSchema);
module.exports = Course;
