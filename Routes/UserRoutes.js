const express = require('express');
const UserControllers = require('../controllers/UserControllers');

const router = express.Router();

const userRoutes = (app) => {
    router.post('/api/v1/dangky', UserControllers.registerUser);

    app.use(router);
};

module.exports = userRoutes;
