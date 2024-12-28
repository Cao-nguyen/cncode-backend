const express = require('express');
const RegisterLoginControllers = require('../controllers/RegisterLoginController')

const router = express.Router();

const userRoutes = (app) => {
    router.post('/api/v1/xacthuc', RegisterLoginControllers.Xacthuc);

    app.use(router);
};

module.exports = userRoutes;
