const mongoose = require("mongoose");

const webSchema = new mongoose.Schema({
  products: [
    {
      name: { type: String },
      link: { type: String },
    },
  ],
  quickLinks: [
    {
      name: { type: String },
      link: { type: String },
    },
  ],
  info: {
    general: { type: String },
    admin: { type: String },
    email: { type: String },
    facebook: { type: String },
    zalo: { type: String },
    youtube: { type: String },
  },
});

const web = mongoose.model("web", webSchema);

module.exports = web;
