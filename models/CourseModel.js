const mongoose = require("mongoose");

const LessonSchema = new mongoose.Schema({
  title: { type: String },
  type: {
    type: String,
    enum: ["video", "text", "document", "quiz"],
  },
  content: { type: String },
  video_url: { type: String },
  questions: [
    {
      type: { type: String },
      time_show: { type: String },
      question: { type: String },
      option: [{ answer: { type: String }, checked: { type: Boolean } }],
      answer: { type: String },
    },
  ],
  order: { type: Number },
  document_url: { type: String },
  quiz: [
    {
      type: { type: String },
      question: { type: String },
      option: [{ answer: { type: String }, checked: { type: Boolean } }],
      answer: { type: String },
    },
  ],
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
    image_url: { type: String },
    slug: { type: String },
    price: { type: Number },
    old_price: { type: Number },
    is_pro: { type: Boolean },
    students_count: { type: Number },
    lessons_count: { type: Number },
    user_progress: { type: Number },
    is_show: { type: String },
    categories: [CategorySchema],
    authorId: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
  },
  { timestamps: true }
);

const Course = mongoose.model("course", CourseSchema);
module.exports = Course;
