const express = require('express');
const RegisterLoginControllers = require('../controllers/RegisterLoginController')
const KhuvuonControllers = require('../controllers/KhuvuonControllers')

const router = express.Router();

const userRoutes = (app) => {
    router.post('/api/v1/xacthuc', RegisterLoginControllers.Xacthuc);
    router.post('/api/v1/dangky', RegisterLoginControllers.RegisterUser);
    router.post('/api/v1/dangnhap', RegisterLoginControllers.LoginUser);
    router.patch('/api/v1/forgot', RegisterLoginControllers.Forgot);

    app.use(router);
};

module.exports = userRoutes;
