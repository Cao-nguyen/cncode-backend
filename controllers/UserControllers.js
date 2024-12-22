const userServices = require('../services/UserService');
const nodemailer = require('nodemailer');
const randomCode = require('../helpers/randomCode')
const Code = require('../models/CodeModel')
require('dotenv').config()

const registerUser = async (req, res) => {
    try {
        const { fullName, email, username, password, code } = req.body;

        if (!fullName || !email || !username || !password) {
            return res.status(404).json({
                EM: 'Đã có lỗi xảy ra',
                EC: -1,
                DT: ""
            })
        }

        let data = await userServices.registerUser(fullName, email, username, password, code);

        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: {
                email: data.DT.email,
                fullName: data.DT.fullName
            }
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

const xacthuc = async (req, res) => {
    const code = randomCode();
    const email = req.body.email;

    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: process.env.EMAIL_NAME,
            pass: process.env.EMAIL_PASSWORD_APP,
        },
    });

    const mailOptions = {
        from: process.env.EMAIL_NAME,
        to: email,
        subject: 'CNcode | Mã xác thực khi đăng ký',
        html: `
            <div style="background-color: #ffffff; max-width: 400px; margin: 0 auto; padding: 20px; border-radius: 8px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); font-family: Arial, sans-serif;">
                <h1 style="text-align: center; color: #333333; font-size: 24px; margin-bottom: 20px;">CNCODE | MÃ XÁC THỰC EMAIL</h1>
                <p style="color: #555555; font-size: 16px; line-height: 1.5; margin-bottom: 20px;">
                    Vui lòng không chia sẻ mã xác thực này với bất kỳ ai. Mã có hiệu lực trong vòng 5 phút kể từ lúc bạn nhận được.
                </p>
                <p style="color: #333333; font-size: 18px; font-weight: bold; text-align: center; padding: 10px; border: 1px solid #e0e0e0; border-radius: 4px; background-color: #f9f9f9;">
                    Mã xác thực của bạn là: <span style="color: #007BFF;">${code}</span>
                </p>
            </div>
        `,
    };

    await transporter.sendMail(mailOptions);

    const codeEmail = new Code({
        code
    });

    await codeEmail.save();

    return res.status(200).json({
        EM: 'Đã gửi mã xác thực vào Email của bạn',
        EC: 0,
        DT: ''
    })
}

const quenmatkhau = async (req, res) => {
    try {
        const { fullName, email, username, password } = req.body

        let data = await userServices.quenmatkhau(fullName, email, username, password);

        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: ''
        })

    } catch (err) {
        console.error(err);
        return res.status(500).json({
            EM: data.EM,
            EC: data.EC,
            DT: ''
        })
    }

}

const login = async (req, res) => {
    try {
        const { fullName, username, password } = req.body

        let data = await userServices.login(fullName, username, password);

        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: ''
        })

    } catch (err) {
        console.error(err);
        return res.status(500).json({
            EM: data.EM,
            EC: data.EC,
            DT: ''
        })
    }

}

module.exports = { registerUser, xacthuc, quenmatkhau, login };