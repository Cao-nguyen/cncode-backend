const Web = require("../models/WebModel");

const WebRead = async (req, res) => {
  const data = await Web.findOne();

  if (data) {
    return res.json({
      EM: "Đã lấy dữ liệu thành công!",
      EC: 0,
      DT: data,
    });
  } else {
    return res.json({
      EM: "Đã có lỗi xảy ra!",
      EC: -1,
      DT: "",
    });
  }
};

const WebEdit = async (req, res) => {
  try {
    const io = req.app.get("io");
    let { products, quickLinks, info } = req.body;

    if (!products || !quickLinks || !info) {
      return res.json({
        EM: "Thiếu dữ liệu cần cập nhật",
        EC: -1,
        DT: "",
      });
    }

    products = products.filter(
      (product) => product.name.trim() !== "" && product.link.trim() !== ""
    );

    quickLinks = quickLinks.filter(
      (link) => link.name.trim() !== "" && link.link.trim() !== ""
    );

    const updatedWeb = await Web.findOneAndUpdate(
      {},
      { $set: { products, quickLinks, info } },
      { new: true, upsert: true }
    );

    io.emit("changeWeb", updatedWeb);

    return res.json({
      EM: "Cập nhật thành công",
      EC: 0,
      DT: updatedWeb,
    });
  } catch (error) {
    return res.json({
      EM: "Lỗi server",
      EC: -2,
      DT: error.message,
    });
  }
};

module.exports = { WebEdit, WebRead };
