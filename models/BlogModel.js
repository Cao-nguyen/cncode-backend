const mongoose = require("mongoose");
const slugify = require("slugify");

const BlogSchema = new mongoose.Schema(
  {
    title: { type: String },
    slug: { type: String },
    isChecked: { type: Boolean, default: false },
    show: { type: Boolean, default: false },
    img: { type: String },
    description: { type: String },
    content: { type: String },
    emotion: [
      {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
        name: { type: String },
        emotionAt: { type: Date, default: Date.now },
      },
    ],
    authorId: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
    active: { type: Boolean, default: true },
    deleted: { type: Boolean, default: false },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
  },
  {
    timestamps: true,
  }
);

BlogSchema.pre("save", function (next) {
  if (this.isModified("title")) {
    const date = new Date();
    const dateString = `${date.getDate()}-${
      date.getMonth() + 1
    }-${date.getFullYear()}`;
    this.slug = slugify(`${this.title} ${dateString}`, {
      lower: true,
      strict: true,
    });
  }
  next();
});

const Blog = mongoose.model("blog", BlogSchema);

module.exports = Blog;
