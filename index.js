const express = require("express");
require("dotenv").config();
const db = require("./config/mongoDB");
const cors = require("cors");
const userRoutes = require("./Routes/UserRoutes");
const adminRoutes = require("./Routes/AdminRoutes");
const http = require("http"); // Tạo HTTP server
const socketIo = require("socket.io"); // Import socket.io

const app = express();

// Lấy cổng từ Vercel hoặc mặc định là 8080
const port = process.env.PORT || 8080;

// Kết nối database (mongoDB)
db.connect();

// Cho phép frontend từ localhost:3000
app.use(
  cors({
    origin: [
      "https://cncode.vercel.app", // Frontend URL
      "http://localhost:3000", // Localhost khi phát triển
      "https://cncode-git-main-cao-nguyens-projects-a928ddee.vercel.app/"
    ],
  })
);

// Middleware để xử lý JSON requests
app.use(express.json());

// Routes
userRoutes(app);
adminRoutes(app);

// Tạo HTTP server thay vì chạy trực tiếp bằng `app.listen`
const server = http.createServer(app);

// Khởi tạo socket.io với server
const io = socketIo(server, {
  cors: {
    origin: [
      "https://cncode.vercel.app", // Frontend URL
      "http://localhost:3000", // Localhost khi phát triển
    ],
  },
});

// Kết nối với WebSocket
io.on("connection", (socket) => {
  console.log(`🔵 Client connected: ${socket.id}`);

  socket.on("message", (data) => {
    console.log("📩 Received:", data);
    io.emit("message", data); // Phát tin nhắn đến tất cả client
  });

  socket.on("disconnect", () => {
    console.log(`🔴 Client disconnected: ${socket.id}`);
  });
});

app.get("/", (req, res) => {
  res.send("Đây là server của CNcode");
});

server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

// Export app thay vì listen trực tiếp
module.exports = app;
