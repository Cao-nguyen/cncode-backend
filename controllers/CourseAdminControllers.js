const Course = require("../models/CourseModel");

const CourseCreate = async (req, res) => {
  const {
    image_url,
    title,
    slug,
    user_progress,
    show,
    price,
    old_price,
    type,
    description,
  } = req.body;

  const io = req.app.get("io");

  const data = new Course({
    image_url,
    title,
    slug,
    user_progress,
    is_show: show,
    price,
    old_price,
    is_pro: type,
    description,
  });

  if (data) {
    await data.save();
    io.emit("pushCourse");

    return res.json({ EM: "Tạo khoá học thành công!", EC: 0, DT: data });
  } else {
    return res.json({ EM: "Tạo khoá học thất bại!", EC: -1, DT: "" });
  }
};

const CourseRead = async (req, res) => {
  const data = await Course.find()
    .sort({ createdAt: -1 })
    .populate("authorId", "fullName avatar");

  if (data) {
    return res.json({ EM: "Thành công!", EC: 0, DT: data });
  } else {
    return res.json({ EM: "Thất bại!", EC: -1, DT: "" });
  }
};

const DmCreate = async (req, res) => {
  const { dd, name } = req.body;
  const io = req.app.get("io");

  const course = await Course.findById(dd);

  const currentLength = course.categories.length;

  const data = await Course.findOneAndUpdate(
    { _id: dd },
    { $push: { categories: { title: name, order: currentLength + 1 } } },
    { new: true }
  );

  if (data) {
    io.emit("pushDm");
    return res.json({ EM: "Thành công!", EC: 0, DT: data });
  } else {
    return res.json({ EM: "Thất bại!", EC: -1, DT: "" });
  }
};

const LsCreate = async (req, res) => {
  const { dd, ct, name } = req.body;
  const io = req.app.get("io");

  const course = await Course.findById(dd);

  if (!course) {
    return res.json({ EM: "Không tìm thấy khoá học!", EC: -1, DT: "" });
  }

  let totalLessons = 0;
  course.categories.forEach((category) => {
    if (Array.isArray(category.lessons)) {
      totalLessons += category.lessons.length;
    }
  });

  const categoryPath = course.categories.find((c) => c._id.toString() === ct);

  if (!categoryPath) {
    return res.json({ EM: "Không tìm thấy danh mục!", EC: -1, DT: "" });
  }

  const updatedCourse = await Course.findOneAndUpdate(
    { _id: dd, "categories._id": ct },
    {
      $push: {
        "categories.$.lessons": {
          title: name,
          order: totalLessons + 1,
        },
      },
    },
    { new: true }
  );

  if (updatedCourse) {
    io.emit("pushLs");
    return res.json({ EM: "Thành công!", EC: 0, DT: updatedCourse });
  } else {
    return res.json({ EM: "Thất bại khi lưu!", EC: -1, DT: "" });
  }
};

const VideoCreate = async (req, res) => {
  const { dd, ct, idLs, video, quizzes } = req.body;
  const io = req.app.get("io");

  console.log(ct);

  const course = await Course.findById(dd);
  const category = course.categories.find((c) => c?._id.toString() === ct);

  console.log(category);

  return res.json({ EM: "Thành công!", EC: 0, DT: "" });
};

module.exports = {
  CourseCreate,
  CourseRead,
  DmCreate,
  LsCreate,
  VideoCreate,
};
