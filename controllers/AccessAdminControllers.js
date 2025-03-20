const Access = require("../models/AccessModel");

const onlineUsers = new Set();

const AccessRead = async (req, res) => {
  const io = req.app.get("io");

  const accessData = await Access.findOneAndUpdate(
    {},
    { $inc: { total: 1 } },
    { new: true }
  );

  io.on("connection", (socket) => {
    onlineUsers.add(socket.id);
    io.emit("updateData", { online: onlineUsers.size });
    socket.on("disconnect", () => {
      onlineUsers.delete(socket.id);
      io.emit("updateData", { online: onlineUsers.size });
    });
  });

  res.json({
    EM: "Thành công",
    EC: 0,
    DT: {
      online: onlineUsers.size,
      totalAccess: accessData.total,
    },
  });
};

module.exports = {
  AccessRead,
  onlineUsers,
};
