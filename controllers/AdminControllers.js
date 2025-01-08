const InforModel = require('../models/InforModel')

const Infor = async (req, res) => {
    try {
        const infor = req.body.Infor;

        const updatedInfor = await InforModel.findOneAndUpdate(
            { infor: infor },
            { new: true }
        );

        if (updatedInfor) {
            return res.json({
                EM: 'Đã cập nhật thông tin thành công!',
                EC: 0,
                DT: ''
            })
        }
    } catch {
        return res.json({
            EM: 'Thông tin chưa được cập nhật',
            EC: -1,
            DT: ''
        })
    }
}

const getInfor = async (req, res) => {
    try {
        const getInforDB = await InforModel.findOne().sort({ _id: -1 });

        return res.json({
            EM: 'Lấy thông tin thành công!',
            EC: 0,
            DT: getInforDB ? getInforDB.infor : '',
        });
    } catch (error) {
        console.error(error);
        return res.json({
            EM: 'Không thành công',
            EC: -1,
            DT: '',
        });
    }
};

module.exports = { Infor, getInfor }