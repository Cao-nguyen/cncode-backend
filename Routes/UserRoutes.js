const express = require('express');
const RegisterLoginControllers = require('../controllers/RegisterLoginController')
const KhuvuonControllers = require('../controllers/KhuvuonControllers')
const ClientControllers = require('../controllers/ClientControllers')

const router = express.Router();

const userRoutes = (app) => {
    router.get('/api/v1/news/client/show', ClientControllers.showNews);
    router.patch('/api/v1/news/client/like', ClientControllers.likeNews);
    router.post('/api/v1/news/client/unlike', ClientControllers.unLikeNews);

    router.post('/api/v1/xacthuc', RegisterLoginControllers.Xacthuc);
    router.post('/api/v1/dangky', RegisterLoginControllers.RegisterUser);
    router.post('/api/v1/dangnhap', RegisterLoginControllers.LoginUser);
    router.patch('/api/v1/forgot', RegisterLoginControllers.Forgot);

    app.use(router);
};

module.exports = userRoutes;
