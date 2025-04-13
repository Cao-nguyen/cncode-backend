const Forum = require("../models/ForumModel");

const ForumRead = async (req, res) => {
  const forum = await Forum.find();

  if (forum) {
    return res.json({ EM: "Thành công!", EC: 0, DT: forum });
  } else {
    return res.json({ EM: "Thất bại!", EC: -1, DT: "" });
  }
};

module.exports = { ForumRead };
