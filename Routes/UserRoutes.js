const express = require('express');
const UserControllers = require('../controllers/UserControllers');

const router = express.Router();

const userRoutes = (app) => {
    router.post('/api/v1/dangky', UserControllers.registerUser);
    router.post('/api/v1/xacthuc', UserControllers.xacthuc);

    app.use(router);
};

module.exports = userRoutes;
