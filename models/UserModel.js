const mongoose = require("mongoose");
const generate = require("../helpers/randomToken");

const Schema = mongoose.Schema;

const Users = new Schema(
  {
    avatar: { type: String },
    description: { type: String },
    fullName: { type: String },
    email: { type: String },
    username: { type: String },
    password: { type: String },
    role: { type: String, default: "user" },
    tokenUser: {
      type: String,
      default: generate.generateRandomString(50),
    },
    coins: { type: String },
    courseId: { type: String },
    huyhieuId: { type: String },
    itemId: { type: String },
    followId: { type: String },
    status: {
      type: String,
      default: "active",
    },
  },
  {
    timestamp: true,
  }
);

module.exports = mongoose.model("users", Users);
