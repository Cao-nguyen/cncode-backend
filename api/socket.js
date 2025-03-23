import { Server } from "socket.io";

export default function handler(req, res) {
  if (!res.socket.server.io) {
    console.log("⚡️ Đang khởi tạo Socket.io...");
    const io = new Server(res.socket.server, {
      cors: {
        origin: "*",
      },
      transports: ["polling"],
    });

    io.on("connection", (socket) => {
      console.log("🔥 Client kết nối:", socket.id);

      socket.on("message", (msg) => {
        console.log("📩 Tin nhắn nhận được:", msg);
        socket.broadcast.emit("message", msg);
      });

      socket.on("disconnect", () => {
        console.log("❌ Client rời đi:", socket.id);
      });
    });

    res.socket.server.io = io;
  }
  res.end();
}
