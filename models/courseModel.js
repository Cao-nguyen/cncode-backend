const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CourseSchema = new Schema(
  {
    title: { type: String }, // Tên khóa học
    slug: { type: String, unique: true }, // URL khóa học
    description: { type: String }, // Mô tả khóa học
    image: { type: String }, // Ảnh minh họa
    price: { type: Number }, // Giá khóa học
    category: { type: String }, // Thể loại khóa học
    teacherId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    }, // Giảng viên
    lessons: [
      {
        title: { type: String }, // Tiêu đề bài học
        videoUrl: { type: String }, // Link video bài học
        content: { type: String }, // Nội dung bài học
        duration: { type: Number }, // Thời lượng (phút)
      },
    ],
    students: [
      {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
        enrolledAt: { type: Date, default: Date.now },
      },
    ],
    status: { type: String, enum: ["public", "private"], default: "public" }, // Trạng thái khóa học
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("courses", CourseSchema);
