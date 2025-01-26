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
        }
    } catch (error) {
        return res.json({
            EC: -1,
            EM: "Thất bại",
            DT: "",
        });
    }
};

const unLikeNews = async (req, res) => {
    try {
        const { fullName, slug } = req.body;

        const news = await News.findOneAndUpdate(
            { slug: slug },
            {
                $pull: {
                    emotion: { name: fullName },
                },
            },
            { new: true }
        );

        if (news) {
            return res.json({
                EC: 0,
                EM: "Unlike thành công",
                DT: news,
            });
        }
    } catch (error) {
        return res.json({
            EC: -1,
            EM: "Có lỗi xảy ra",
            DT: "",
        });
    }
};



module.exports = { unLikeNews, showNews, likeNews }