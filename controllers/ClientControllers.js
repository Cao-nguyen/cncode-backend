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

const likeNews = async (req, res) => {
    try {
        const { fullName, slug } = req.body;

        const news = await News.findOneAndUpdate(
            { slug: slug },
            {
                $inc: { like: 1 },
                $push: {
                    emotion: {
                        name: fullName,
                        emotionAt: Date.now(),
                    },
                },
            },
            { new: true }
        );

        if (news) {
            return res.json({
                EC: 0,
                EM: "Thành công",
                DT: news,
            });
        } else {
            return res.json({
                EC: -1,
                EM: "Không tìm thấy bài viết",
                DT: "",
            });
        }
    } catch (error) {
        return res.json({
            EC: -1,
            EM: "Thất bại",
            DT: "",
        });
    }
};


module.exports = { showNews, likeNews }