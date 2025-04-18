const Contest = require("../models/ContestModel");

const ContestCreate = async (req, res) => {
  const { form } = req.body;

  const data = new Contest({
    name: form.name,
    description: form.description,
    level: form.level,
    openTime: form.openTime ? form.openTime : null,
    closeTime: form.closeTime ? form.closeTime : null,
    slug: form.slug,
    password: form.password,
    show: form.show,
    time: form.time,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  });

  if (data) {
    await data.save();
    return res.json({ EM: "Tạo bài luyện tập thành công!", EC: 0, DT: data });
  } else {
    return res.json({ EM: "Tạo bài luyện tập thất bại!", EC: -1, DT: "" });
  }
};

const ContestRead = async (req, res) => {
  const data = await Contest.find().sort({ createdAt: -1 });

  if (data) {
    return res.json({ EM: "Thành công!", EC: 0, DT: data });
  } else {
    return res.json({ EM: "Thất bại!", EC: -1, DT: "" });
  }
};

module.exports = {
  ContestCreate,
  ContestRead,
};
