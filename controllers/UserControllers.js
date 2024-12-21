const userServices = require('../services/UserService');

const registerUser = async (req, res) => {
    try {
        const { fullName, email, username, password } = req.body;

        if (!fullName || !email || !username || !password) {
            return res.status(404).json({
                EM: 'Đã có lỗi xảy ra',
                EC: -1,
                DT: ""
            })
        }

        let data = await userServices.registerUser(fullName, email, username, password);

        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: ""
        })

    } catch (err) {
        console.error(err);
        return res.status(500).json({
            EM: 'Có một số lỗi vui lòng thử lại sau!',
            EC: -1,
            DT: ''
        })
    }
}

module.exports = { registerUser };