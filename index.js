const express = require('express');
require('dotenv').config();
const db = require('./config/mongoDB');
const cors = require('cors');
const userRoutes = require('./Routes/UserRoutes');

const app = express();
const port = process.env.PORT || 8080;

// Kết nối database (mongoDB)
db.connect();

// Cho phép frontend từ localhost:3000
app.use(cors());

// Middleware để xử lý JSON requests
app.use(express.json());

// Routes
userRoutes(app);

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
