const Access = require("../models/AccessModel");

const onlineUsers = new Set();
const activeSessions = new Map();

const AccessRead = async (req, res) => {
  const io = req.app.get("io");

  if (!io._connectionListenerSet) {
    io._connectionListenerSet = true;

    io.on("connection", (socket) => {
      const userIP = socket.handshake.address;
      const sessionId = socket.id;

      if (!activeSessions.has(userIP)) {
        activeSessions.set(userIP, Date.now());

        Access.findOneAndUpdate(
          {},
          { $inc: { total: 1 } },
          { new: true, upsert: true }
        )
          .then((accessData) => {
            io.emit("updateTotalAccess", { totalAccess: accessData.total });
          })
          .catch((error) => {
            console.error("Error updating total access:", error);
          });

        setTimeout(() => {
          activeSessions.delete(userIP);
        }, 3600000);
      } else {
        activeSessions.set(userIP, Date.now());
      }

      onlineUsers.add(sessionId);
      io.emit("updateData", { online: onlineUsers.size });

      socket.on("disconnect", () => {
        onlineUsers.delete(sessionId);
        io.emit("updateData", { online: onlineUsers.size });
      });
    });
  }

  try {
    const accessData = await Access.findOne({});
    res.json({
      EM: "Thành công",
      EC: 0,
      DT: {
        totalAccess: accessData ? accessData.total : 0,
        online: onlineUsers.size,
      },
    });
  } catch (error) {
    console.error("Error fetching total access:", error);
    res.status(500).json({ EM: "Lỗi server", EC: 1, DT: null });
  }
};

module.exports = {
  AccessRead,
  onlineUsers,
};
