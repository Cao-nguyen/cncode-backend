const mongoose = require("mongoose");
const slugify = require("slugify");

const BlogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: {
      type: String,
      unique: true,
    },
    isChecked: { type: Boolean, default: false },
    show: { type: Boolean, default: false },
    img: { type: String },
    description: { type: String },
    content: { type: String },
    emotion: [
      {
        name: { type: String },
        emotionAt: { type: Date, default: Date.now },
      },
    ],
    active: { type: Boolean },
    fullName: { type: String },
    deleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

BlogSchema.pre("save", async function (next) {
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
