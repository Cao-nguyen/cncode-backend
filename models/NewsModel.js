const mongoose = require("mongoose");
const slugify = require("slugify");

const NewsSchema = new mongoose.Schema(
  {
    title: { type: String, trim: true },
    slug: { type: String },
    isChecked: { type: Boolean, default: false },
    show: { type: Boolean, default: true },
    description: { type: String },
    content: { type: String },
    emotion: [
      {
        _id: false,
        name: { type: String },
        emotionAt: { type: Date, default: Date.now },
      },
    ],
    authorId: { type: mongoose.Schema.Types.ObjectId, ref: "users" }, // Người đăng tin
    deleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

// Middleware tạo slug trước khi lưu
NewsSchema.pre("save", async function (next) {
  if (this.isModified("title")) {
    let newSlug = slugify(this.title, { lower: true, strict: true });

    // Đảm bảo slug là duy nhất
    let existingNews = await this.constructor.findOne({ slug: newSlug });
    if (existingNews) {
      const date = new Date();
      const dateString = `${date.getDate()}-${
        date.getMonth() + 1
      }-${date.getFullYear()}`;
      newSlug = slugify(`${this.title} ${dateString}`, {
        lower: true,
        strict: true,
      });
    }

    this.slug = newSlug;
  }
  next();
});

const News = mongoose.model("News", NewsSchema);

module.exports = News;
