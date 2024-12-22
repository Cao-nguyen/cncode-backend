const bcrypt = require('bcryptjs');
const User = require('../models/UserModel');
const Code = require('../models/CodeModel')
const generate = require('../helpers/randomToken');

// Hàm băm mật khẩu
const hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
};

// Hàm đăng ký người dùng
const registerUser = async (fullName, email, username, password, code) => {
    try {
        const userEmailExists = await User.findOne({ email });
        const userUsernameExists = await User.findOne({ username });
        const codeRecord = await Code.findOne({ code });

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

        if (code === codeRecord.code) {
            const newUser = new User({
                fullName,
                email,
                username,
                password: hashedPassword,
                tokenUser: generate.generateRandomString(50)
            });


            await newUser.save();

            return {
                EM: 'Chúc mừng bạn đã đăng ký thành công!',
                EC: 0,
                DT: newUser
            };
        }

        return {
            EM: 'Mã xác thực không đúng hoặc đã hết hạn',
            EC: -1,
            DT: ''
        }

    } catch (err) {
        console.error(err);
        return {
            EM: 'Có một số lỗi đã xảy ra',
            EC: -1,
            DT: err
        };
    }
};

const quenmatkhau = async (fullName, email, username, password) => {
    try {
        const isFullName = await User.findOne({ fullName });
        const isUsername = await User.findOne({ username });
        const isEmail = await User.findOne({ email });
        const isPassword = await User.findOne({ password });
        const hashedPassword = await hashPassword(password)

        if (!isFullName && !isUsername && !isEmail && !isPassword) {
            return {
                EM: 'Bạn nhập không đủ thông tin',
                EC: -1,
                DT: '',
            }
        } else {
            await User.updateOne({
                password: hashedPassword
            })

            return {
                EM: 'Đã cập nhật mật khẩu thành công!',
                EC: 0,
                DT: '',
            }
        }
    } catch {
        return {
            EM: 'Đã có một số lỗi xảy ra trong quá trình lấy lại mật khẩu',
            EC: -1,
            DT: '',
        }
    }
}

const login = async (fullName, username, password) => {
    try {
        const user = await User.findOne({ username });

        if (!user) {
            return {
                EM: 'Tên đăng nhập không tồn tại',
                EC: -1,
                DT: ''
            };
        }

        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            return {
                EM: 'Mật khẩu không chính xác',
                EC: -1,
                DT: ''
            };
        }

        return {
            EM: 'Đăng nhập thành công',
            EC: 0,
            DT: user
        };
    } catch (error) {
        return {
            EM: 'Đã có một số lỗi xảy ra trong quá trình đăng nhập',
            EC: -1,
            DT: '',
        };
    }
};



module.exports = { registerUser, quenmatkhau, login };
