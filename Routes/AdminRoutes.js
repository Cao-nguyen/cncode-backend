const express = require('express');
const AdminControllers = require('../controllers/AdminControllers')
const NewsControllers = require('../controllers/NewsControllers')

const router = express.Router();

const adminRoutes = (app) => {
    router.post('/api/v1/news/create', NewsControllers.createFunc)
    router.get('/api/v1/news/show', NewsControllers.showFunc)
    router.patch('/api/v1/news/edit/:id', NewsControllers.editFunc)
    router.patch('/api/v1/news/delete/:id', NewsControllers.deleteFunc)

    router.post('/api/v1/bins/news/delete', AdminControllers.deleteNewsFunc)
    router.patch('/api/v1/bins/news/patch', AdminControllers.patchNewsFunc)
    router.get('/api/v1/bins/news', AdminControllers.showNewsFunc)


    router.patch('/api/v1/infor', AdminControllers.Infor);
    router.get('/api/v1/infor', AdminControllers.getInfor);

    app.use(router);
};

module.exports = adminRoutes;
