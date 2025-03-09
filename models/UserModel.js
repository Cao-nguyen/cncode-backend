const mongoose = require("mongoose");
const generate = require("../helpers/randomToken");

const Schema = mongoose.Schema;

const Users = new Schema(
  {
    avatar: { type: String },
    description: { type: String },
    fullName: { type: String },
    email: { type: String, unique: true },
    username: { type: String, unique: true },
    password: { type: String },
    role: { type: String, default: "user" },
    tokenUser: {
      type: String,
      default: generate.generateRandomString(50),
    },
    coins: { type: Number, default: 0 },
    courseId: [{ type: Schema.Types.ObjectId, ref: "Course" }],
    huyhieuId: [{ type: Schema.Types.ObjectId, ref: "HuyHieu" }],
    itemId: [{ type: Schema.Types.ObjectId, ref: "Item" }],
    followId: [{ type: Schema.Types.ObjectId, ref: "User" }],
    status: { type: String, default: "active" },
    otherInfo: [{ name: { type: String }, link: { type: String } }],
    additionalString: { type: String },
    memberPoints: { type: Number, default: 0 },
    routesQuyen: [{ type: String }],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("users", Users);
