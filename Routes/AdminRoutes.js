const express = require('express');
const AdminControllers = require('../controllers/AdminControllers')

const router = express.Router();

const adminRoutes = (app) => {
    router.patch('/api/v1/infor', AdminControllers.Infor);
    router.get('/api/v1/infor', AdminControllers.getInfor);

    app.use(router);
};

module.exports = adminRoutes;
