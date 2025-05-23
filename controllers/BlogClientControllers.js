const Blog = require("../models/BlogModel");
const Thongbao = require("../models/thongbaoModel");
const User = require("../models/UserModel");

const MeblogRead = async (req, res) => {
  const { id } = req.params;

  const rawBlog = await Blog.find({
    authorId: id,
  })
    .populate("authorId", "fullName")
    .select("-like -comments -gift -favorites");

  if (rawBlog) {
    return res.json({
      EM: "Thành công!",
      EC: 0,
      DT: rawBlog,
    });
  } else {
    return res.json({
      EM: "Thất bại",
      EC: -1,
      DT: "",
    });
  }
};

const BlogCreate = async (req, res) => {
  const io = req.app.get("io");
  const { title, content, description, show, isChecked, img, id } = req.body;

  const blog = new Blog({
    title: title,
    isChecked: isChecked,
    show: Boolean(show),
    img: img,
    description: description,
    content: content,
    active: "",
    authorId: id,
  });

  const rawBlog = await blog.save();

  if (rawBlog) {
    io.emit("createBlog", rawBlog);

    return res.json({
      EM: "Đăng tải bài viết thành công!",
      EC: 0,
      DT: rawBlog,
    });
  } else {
    return res.json({
      EM: "Đăng tải bài viết thất bại!",
      EC: -1,
      DT: "",
    });
  }
};

const BlogRead = async (req, res) => {
  const rawBlog = await Blog.find({
    active: "chapnhan",
    deleted: false,
    show: true,
    isChecked: true,
  })
    .populate("authorId", "fullName avatar info role")
    .populate("comments.userComment", "fullName avatar _id")
    .sort({ createdAt: -1 });

  rawBlog.forEach((post) => {
    post.comments.sort((a, b) => b.commentedAt - a.commentedAt);
  });

  if (rawBlog) {
    return res.json({
      EM: "Thành công!",
      EC: 0,
      DT: rawBlog,
    });
  } else {
    return res.json({
      EM: "Thất bại!",
      EC: -1,
      DT: "",
    });
  }
};

const BlogLike = async (req, res) => {
  const { id, idPost } = req.body;
  const io = req.app.get("io");

  const blog = await Blog.findOneAndUpdate(
    { _id: idPost },
    {
      $push: {
        like: {
          userLike: id,
          likedAt: Date.now(),
        },
      },
    },
    { new: true }
  );

  const newBlog = await Blog.findOne({ _id: idPost });
  const tb = new Thongbao({
    user_one: id,
    user_two: newBlog.authorId,
    content: "đã thả tim blog",
    others: newBlog.title,
  });

  await tb.save();

  blog.comments.sort((a, b) => b.commentedAt - a.commentedAt);

  if (blog) {
    io.emit("pushLike");
    return res.json({
      EC: 0,
      EM: "Thành công",
      DT: blog,
    });
  }
};

const BlogUnlike = async (req, res) => {
  const { id, idPost } = req.body;
  const io = req.app.get("io");

  const blog = await Blog.findOneAndUpdate(
    { _id: idPost },
    {
      $pull: {
        like: {
          userLike: id,
        },
      },
    },
    { new: true }
  );

  blog.comments.sort((a, b) => b.commentedAt - a.commentedAt);

  if (blog) {
    io.emit("pushUnlike");
    return res.json({
      EC: 0,
      EM: "Thành công",
      DT: blog,
    });
  }
};

const BlogF = async (req, res) => {
  const { id, idPost } = req.body;
  const io = req.app.get("io");

  const blog = await Blog.findOneAndUpdate(
    { _id: idPost },
    {
      $push: {
        favorites: {
          userFavorite: id,
          favoritedAt: Date.now(),
        },
      },
    },
    { new: true }
  );

  blog.comments.sort((a, b) => b.commentedAt - a.commentedAt);

  if (blog) {
    io.emit("pushF");
    return res.json({
      EC: 0,
      EM: "Thành công",
      DT: blog,
    });
  }
};

const BlogUnf = async (req, res) => {
  const { id, idPost } = req.body;
  const io = req.app.get("io");

  const blog = await Blog.findOneAndUpdate(
    { _id: idPost },
    {
      $pull: {
        favorites: {
          userFavorite: id,
        },
      },
    },
    { new: true }
  );

  blog.comments.sort((a, b) => b.commentedAt - a.commentedAt);

  if (blog) {
    io.emit("pushUnf");
    return res.json({
      EC: 0,
      EM: "Thành công",
      DT: blog,
    });
  }
};

const UserBlogRead = async (req, res) => {
  const id = req.params.id;

  const user = await User.findById(id)
    .select("_id gift")
    .populate({ path: "gift.giftId", select: "name img" });

  if (user) {
    return res.json({ EM: "Thành công!", EC: 0, DT: user });
  } else {
    return res.json({ EM: "Thất bại!", EC: -1, DT: "" });
  }
};

module.exports = {
  BlogCreate,
  MeblogRead,
  BlogRead,
  BlogLike,
  BlogUnlike,
  BlogF,
  BlogUnf,
  UserBlogRead,
};
