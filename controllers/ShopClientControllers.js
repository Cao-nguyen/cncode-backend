const Shop = require("../models/ShopModel");
const User = require("../models/UserModel");

const ShopRead = async (req, res) => {
  const data = await Shop.find();

  if (data) {
    return res.json({
      EM: "Thành công!",
      EC: 0,
      DT: data,
    });
  } else {
    return res.json({
      EM: "Thất bại!",
      EC: -1,
      DT: "",
    });
  }
};

const ShopUserRead = async (req, res) => {
  const { id } = req.params;

  const data = await User.findOne({ _id: id }).select("-password -tokenUser");

  if (data) {
    return res.json({
      EM: "Thành công!",
      EC: 0,
      DT: data,
    });
  } else {
    return res.json({
      EM: "Thất bại!",
      EC: -1,
      DT: "",
    });
  }
};

const ShopCreate = async (req, res) => {
  const { buyId, count, tong, userId, userCoins } = req.body;
  const io = req.app.get("io");

  const money = userCoins - tong;

  const data = await User.findOneAndUpdate(
    { _id: userId },
    { $push: { gift: { $each: Array(count).fill({ buyId }) } }, coins: money }
  );

  if (data) {
    io.emit("buyPush");
    return res.json({ EM: "Đã mua thành công!", EC: 0, DT: data });
  } else {
    return res.json({ EM: "Quá trình thanh toán thất bại", EC: -1, DT: "" });
  }
};

module.exports = {
  ShopRead,
  ShopUserRead,
  ShopCreate,
};
