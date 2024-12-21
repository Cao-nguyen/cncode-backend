const bcrypt = require('bcryptjs');
const User = require('../models/UserModel');
const generate = require('../helpers/randomToken');

// Hàm băm mật khẩu
const hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
};

// Hàm đăng ký người dùng
const registerUser = async (fullName, email, username, password) => {
    try {
        const userEmailExists = await User.findOne({ email });
        const userUsernameExists = await User.findOne({ username });

        if (userEmailExists) {
            return {
                EM: 'Email đã tồn tại',
                EC: -1,
                DT: '',
            }
        }

        if (userUsernameExists) {
            return {
                EM: 'Tên đăng nhập đã tồn tại',
                EC: -1,
                DT: '',
            }
        }

        // Băm mật khẩu trước khi lưu
        const hashedPassword = await hashPassword(password);

        // Tạo user mới
        const newUser = new User({
            fullName,
            email,
            username,
            password: hashedPassword,
            tokenUser: generate.generateRandomString(50)
        });

        // Lưu vào database
        await newUser.save();

        return {
            EM: 'Chúc mừng bạn đã đăng ký thành công!',
            EC: 0,
            DT: newUser
        };

    } catch (err) {
        console.error(err);
        return {
            EM: 'Có một số lỗi đã xảy ra',
            EC: -1,
            DT: err
        };
    }
};


module.exports = { registerUser };
