const express = require("express");
require("dotenv").config();
const db = require("./config/mongoDB");
const cors = require("cors");
const userRoutes = require("./Routes/UserRoutes");
const adminRoutes = require("./Routes/AdminRoutes");
const http = require("http");
const socketIo = require("socket.io");

const app = express();

const port = process.env.PORT || 8080;

// Kết nối database (mongoDB)
db.connect();

app.use(cors({}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
userRoutes(app);
adminRoutes(app);

const server = http.createServer(app);
const io = socketIo(server, {
  cors: {},
  transports: ["polling"],
});

app.set("io", io);

app.get("/", (req, res) => {
  res.send("Đây là server của CNcode");
});

server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

// Export app thay vì listen trực tiếp
module.exports = app;
