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

module.exports = {
  CourseCreate,
  CourseRead,
};
