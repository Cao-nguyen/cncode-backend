const News = require('../models/NewsModel');

const createFunc = async (req, res) => {
    try {
        const { title, isChecked, show, description, content, fullName } = req.body;

        const newNews = new News({
            title,
            isChecked,
            show,
            description,
            content,
            fullName,
        });

        await newNews.save();

        return res.json({
            EC: 0,
            EM: 'Đã đăng tải tin tức thành công!',
            DT: newNews,
        });
    } catch (error) {
        console.log(error)
        return res.json({
            EC: -1,
            EM: 'Đã có lỗi xảy ra',
            DT: error.message,
        });
    }
};

const showFunc = async (req, res) => {
    try {
        const news = await News.find({ deleted: false })
            .sort({ createdAt: -1 })

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

const editFunc = async (req, res) => {
    try {
        const { id, title, description, isChecked, show, content } = req.body;

        const updatedNews = {
            title: title,
            description: description,
            isChecked: isChecked,
            show: show,
            content: content,
        };

        await News.updateOne({ _id: id }, { $set: updatedNews });

        return res.json({
            EC: 0,
            EM: "Đã cập nhật tin tức thành công",
            DT: updatedNews,
        });
    } catch (error) {
        return res.json({
            EC: -1,
            EM: "Có lỗi xảy ra",
            DT: error.message,
        });
    }
};

const deleteFunc = async (req, res) => {
    try {
        const { id } = req.body

        await News.updateOne(
            { _id: id },
            { deleted: true }
        )

        return res.json({
            EC: 0,
            EM: "Đã xoá tin tức này thành công!",
            DT: ""
        })
    } catch {
        return res.json({
            EC: -1,
            EM: "Đã có lỗi xảy ra",
            DT: ""
        })
    }
}

module.exports = { createFunc, showFunc, editFunc, deleteFunc };
