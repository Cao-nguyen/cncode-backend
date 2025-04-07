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

module.exports = {
  ShopRead,
  ShopUserRead,
};
