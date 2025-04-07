const Shop = require("../models/ShopModel");
const cloudinary = require("cloudinary").v2;
require("dotenv").config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

const ShopCreate = async (req, res) => {
  const { imageUrl, name, price } = req.body;
  const io = req.app.get("io");

  const data = new Shop({
    name: name,
    price: price,
    img: imageUrl,
  });

  if (data) {
    await data.save();

    io.emit("pushShop");

    return res.json({
      EM: "Đã đăng sản phẩm thành công!",
      EC: 0,
      DT: data,
    });
  } else {
    return res.json({
      EM: "Đã đăng sản phẩm thất bại!",
      EC: -1,
      DT: "",
    });
  }
};

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

const ShopDelete = async (req, res) => {
  const { id, publicId } = req.body;
  const io = req.app.get("io");

  console.log(publicId);

  const imageExists = await cloudinary.api.resource(publicId).catch(() => null);

  if (!imageExists) {
    return res.json({
      EM: "Ảnh không tồn tại",
      EC: -1,
      DT: "",
    });
  }

  const result = await cloudinary.uploader.destroy(publicId);

  const data = await Shop.findOneAndDelete({ _id: id });

  if (data && result) {
    io.emit("deleteShop");
    return res.json({ EM: "Xoá sản phẩm thành công!", EC: 0, DT: data });
  } else {
    return res.json({ EM: "Xoá sản phẩm thất bại!", EC: -1, DT: "" });
  }
};

module.exports = {
  ShopCreate,
  ShopRead,
  ShopDelete,
};
