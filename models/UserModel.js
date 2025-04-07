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
    info: { type: String, default: "" },
    mxh: [{ name: { type: String }, link: { type: String } }],
    ks: { type: String },
    birthday: { type: String, default: "1/1/2025" },
    tinh: { type: String, default: "" },
    school: { type: String, default: "" },
    coins: { type: Number, default: 100 },
    status: { type: String, default: "active" },
    memberPoints: { type: Number, default: 0 },
    gift: [{ giftId: { type: mongoose.Schema.Types.ObjectId, ref: "shops" } }],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("users", Users);
