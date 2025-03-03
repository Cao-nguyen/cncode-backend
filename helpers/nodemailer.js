const nodemailer = require("nodemailer");
require("dotenv").config();

let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD_APP,
  },
});

const sendEmail = async (email, subject, htmlContent) => {
  const mailOptions = {
    from: process.env.EMAIL_NAME,
    to: email,
    subject: subject,
    html: htmlContent,
  };

  try {
    await transporter.sendMail(mailOptions);
    return {
      EM: "Đã gửi mã xác thực đến Email của bạn",
      EC: 0,
      DT: "",
    };
  } catch (error) {
    console.log("EMAIL_NAME:", process.env.EMAIL_NAME);
    console.log("EMAIL_PASSWORD_APP:", process.env.EMAIL_PASSWORD_APP);
    return {
      EM: "Không thể gửi mã xác thực đến Email của bạn",
      EC: -1,
      DT: "",
    };
  }
};

module.exports = sendEmail;
