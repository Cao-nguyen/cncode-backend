const mongoose = require("mongoose");

const AccessSchema = new mongoose.Schema({
  total: { type: Number, default: 0 },
});

module.exports = mongoose.model("access", AccessSchema);
