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
    like: [
      {
        _id: false,
        userLike: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
        likedAt: { type: Date, default: Date.now },
      },
    ],
    favorites: [
      {
        _id: false,
        userFavorite: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
        favoritedAt: { type: Date, default: Date.now },
      },
    ],
    comments: [
      {
        userComment: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
        comment: { type: String },
        commentedAt: { type: Date, default: Date.now },
        parrentId: { type: mongoose.Schema.Types.ObjectId, ref: "blogs" },
      },
    ],
    gift: [
      {
        userGift: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
        type: { type: String },
        giftedAt: { type: Date, default: Date.now },
        notes: { type: String },
      },
    ],
    authorId: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
    active: { type: String },
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
