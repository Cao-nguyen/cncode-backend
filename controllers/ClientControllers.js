const News = require('../models/NewsModel');

const showNews = async (req, res) => {
    try {
        const news = await News.find({
            deleted: false,
            show: true,
            isChecked: true
        }).sort({ createdAt: -1 })

        return res.json({
            EC: 0,
            EM: "Thành công",
            DT: news
        })
    } catch {
        return res.json({
            EC: -1,
            EM: "Thất bại",
            DT: ""
        })
    }
}

module.exports = { showNews }