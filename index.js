const express = require('express');
require('dotenv').config();
const db = require('./config/mongoDB');
const cors = require('cors');
const userRoutes = require('./Routes/UserRoutes');
const adminRoutes = require('./Routes/AdminRoutes')

const app = express();
const port = process.env.PORT || 8080;

// Kết nối database (mongoDB)
db.connect();

// Cho phép frontend từ localhost:3000
app.use(cors({
  origin: [
    'https://cncode.vercel.app',
    'http://localhost:3000'
  ]
}));

// Middleware để xử lý JSON requests
app.use(express.json());

// Routes
userRoutes(app);
adminRoutes(app)

app.get("/", (req, res) => {
  res.send("Hello, Vercel!");
});

// Export app thay vì listen trực tiếp
// module.exports = app

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
