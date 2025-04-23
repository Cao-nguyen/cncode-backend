const mongoose = require("mongoose");

const CodeSchema = new mongoose.Schema({
  email: { type: String },
  code: { type: String },
  expiresAt: {
    type: Date,
    default: Date.now(),
    expires: 600,
  },
});

module.exports = mongoose.model("Code", CodeSchema);
