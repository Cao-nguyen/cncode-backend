const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CourseSchema = new Schema(
  {
    title: { type: String }, // Tên khóa học
    slug: { type: String, default: "" }, // URL khóa học
    description: { type: String }, // Mô tả khóa học
    image: { type: String }, // Ảnh minh họa
    price: { type: Number }, // Giá khóa học
    category: { type: String }, // Thể loại khóa học
    teacherId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
    lessons: [
      {
        title: { type: String },
        videoUrl: { type: String },
        content: { type: String },
        duration: { type: Number },
      },
    ],
    students: [
      {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
        enrolledAt: { type: Date, default: Date.now },
      },
    ],
    status: { type: String, enum: ["public", "private"], default: "public" },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("meCourses", CourseSchema);
