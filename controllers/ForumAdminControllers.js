const Forum = require("../models/ForumModel");

const ForumCreate = async (req, res) => {
  const { name, description, law, allowChat, allowVote } = req.body;
  const io = req.app.get("io");

  const forum = new Forum({
    name: name,
    description: description,
    forum_law: law,
    allow_chat: allowChat,
    allow_vote: allowVote,
  });

  if (forum) {
    await forum.save();
    io.emit("pushForum");
    return res.json({ EM: "Tạo diễn đàn thành công!", EC: 0, DT: forum });
  } else {
    return res.json({ EM: "Tạo diễn đàn thất bại!", EC: -1, DT: "" });
  }
};

const ForumRead = async (req, res) => {
  const forum = await Forum.find();

  if (forum) {
    return res.json({ EM: "Thành công!", EC: 0, DT: forum });
  } else {
    return res.json({ EM: "Thất bại!", EC: -1, DT: "" });
  }
};

const ForumEdit = async (req, res) => {
  const { id, name, description, law, allowChat, allowVote } = req.body;
  const io = req.app.get("io");

  const forum = await Forum.findOneAndUpdate(
    { _id: id },
    {
      name: name,
      description: description,
      forum_law: law,
      allow_chat: allowChat,
      allow_vote: allowVote,
    }
  );

  if (forum) {
    io.emit("pushForum");
    return res.json({ EM: "Cập nhật diễn đàn thành công!", EC: 0, DT: forum });
  } else {
    return res.json({ EM: "Cập nhật diễn đàn thất bại!", EC: -1, DT: "" });
  }
};

const ForumDelete = async (req, res) => {
  const { id } = req.body;
  const io = req.app.get("io");

  const forum = await Forum.findOneAndDelete({ _id: id });

  if (forum) {
    io.emit("pushForum");
    return res.json({ EM: "Cập nhật diễn đàn thành công!", EC: 0, DT: forum });
  } else {
    return res.json({ EM: "Cập nhật diễn đàn thất bại!", EC: -1, DT: "" });
  }
};

module.exports = { ForumCreate, ForumRead, ForumEdit, ForumDelete };
