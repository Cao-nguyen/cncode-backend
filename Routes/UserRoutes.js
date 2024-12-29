const express = require('express');
const RegisterLoginControllers = require('../controllers/RegisterLoginController')

const router = express.Router();

const userRoutes = (app) => {
    router.post('/api/v1/xacthuc', RegisterLoginControllers.Xacthuc);
    router.post('/api/v1/dangky', RegisterLoginControllers.RegisterUser);
    router.post('/api/v1/dangnhap', RegisterLoginControllers.LoginUser);

    app.use(router);
};

module.exports = userRoutes;
