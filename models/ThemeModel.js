const mongoose = require("mongoose");

const ThemeSchema = new mongoose.Schema({
  name: { type: String },
  key: { type: String },
  date: { type: String },
  active: { type: Boolean },
});

const theme = mongoose.model("theme", ThemeSchema);

module.exports = theme;
