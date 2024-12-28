const nodemailer = require('nodemailer');
require('dotenv').config();

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_NAME,
        pass: process.env.EMAIL_PASSWORD_APP
    }
});

const sendMail = async ({ email, subject, html }) => {
    let mailOptions = {
        from: process.env.EMAIL_NAME,
        to: email,
        subject: subject,
        html: html
    };

    try {
        let info = await transporter.sendMail(mailOptions);
        console.log('Email sent: ' + info.response);
        return info;
    } catch (error) {
        console.error('Lỗi khi gửi email:', error);
        throw error;
    }
};

module.exports = sendMail;