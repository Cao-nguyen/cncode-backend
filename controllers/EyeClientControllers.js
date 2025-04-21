const Blog = require("../models/BlogModel");
const New = require("../models/NewsModel");

const EyeBlogCreate = async (req, res) => {
  const { id } = req.body;

  await Blog.findOneAndUpdate({ _id: id }, { $inc: { eye_watch: 1 } });
};

const EyeNewCreate = async (req, res) => {
  const { id } = req.body;
  console.log(id);

  await New.findOneAndUpdate({ _id: id }, { $inc: { eye_watch: 1 } });
};

module.exports = { EyeBlogCreate, EyeNewCreate };
