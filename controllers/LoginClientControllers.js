const bcrypt = require("bcryptjs");
const SendMail = require("../helpers/nodemailer");
const randomCode = require("../helpers/randomCode");
const emailTemplate = require("../helpers/emailTemplate");
const Code = require("../models/CodeModel");
const User = require("../models/UserModel");

const Xacthuc = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.json({
      EM: "Vui lòng nhập email",
      EC: -1,
      DT: "",
    });
  }

  const code = randomCode();
  const subject = "CNCODE | MÃ XÁC THỰC EMAIL";
  const html = emailTemplate(code);
  let data = await SendMail(email, subject, html);

  if (data.EC === 0) {
    await Code.findOneAndUpdate(
      { email },
      { code, createdAt: Date.now() },
      { upsert: true }
    );
    return res.json({
      EM: "Mã xác thực đã được gửi",
      EC: 0,
      DT: "",
    });
  }
  return res.json({
    EM: "Gửi mã thất bại",
    EC: -1,
    DT: "",
  });
};

const RegisterUser = async (req, res) => {
  try {
    const { fullName, email, username, password, code, whereNow, tinh } =
      req.body;

    const newFullName = fullName.trim();
    const newUsername = username.trim();

    const isEmail = await User.findOne({ email });
    if (isEmail)
      return res.json({
        EM: "Email đã tồn tại",
        EC: -1,
        DT: "",
      });

    const isUsername = await User.findOne({ username });
    if (isUsername)
      return res.json({
        EM: "Username đã tồn tại",
        EC: -1,
        DT: "",
      });

    // Mã xác thực có đúng không?
    const codeNumbers = await Code.findOne({ code });
    if (!codeNumbers) {
      return res.json({
        EM: "Mã xác thực không chính xác",
        EC: -1,
        DT: "",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      email,
      fullName: newFullName,
      username: newUsername,
      password: hashedPassword,
      coins: "0",
      ks: whereNow,
      tinh: tinh,
      avatar:
        "https://res.cloudinary.com/dckuqnehz/image/upload/v1740879702/uploads/img/09-03-2025/tj6bbt7utxblh4q9a3vk",
    });

    if (user) {
      await user.save();
    } else {
      return;
    }

    if (user) {
      await Code.findOneAndDelete({ email: email });

      return res.json({
        EM: "Đăng ký thành công!",
        EC: 0,
        DT: {
          fullName: user.fullName,
          username: user.username,
          role: user.role,
          id: user._id,
        },
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ EM: "Lỗi server", EC: -2, DT: "" });
  }
};

const LoginUser = async (req, res) => {
  const { username, password } = req.body;

  const newUsername = username.trim();

  if (!newUsername || !password) {
    return res.json({
      EM: "Vui lòng nhập tên đăng nhập và mật khẩu",
      EC: -1,
      DT: "",
    });
  }

  const user = await User.findOne({
    username: newUsername,
  });

  if (!user) {
    return res.json({
      EM: "Tài khoản không tồn tại",
      EC: -1,
      DT: "",
    });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.json({
      EM: "Mật khẩu không chính xác",
      EC: -1,
      DT: "",
    });
  }

  return res.json({
    EM: "Đăng nhập thành công",
    EC: 0,
    DT: {
      id: user._id,
      fullName: user.fullName,
      username,
      role: user.role,
    },
  });
};

const Forgot = async (req, res) => {
  const { email, code, password } = req.body;
  if (!email || !code || !password) {
    return res.json({ EM: "Vui lòng nhập đầy đủ thông tin", EC: -1, DT: "" });
  }

  const codeEntry = await Code.findOne({ email, code });
  if (!codeEntry) {
    return res.json({
      EM: "Mã xác thực không đúng hoặc đã hết hạn",
      EC: -1,
      DT: "",
    });
  }

  await Code.deleteOne({ _id: codeEntry._id });
  const hashedPassword = await bcrypt.hash(password, 10);
  await User.updateOne({ email }, { $set: { password: hashedPassword } });

  return res.json({ EM: "Mật khẩu đã được đặt lại thành công", EC: 0, DT: "" });
};

module.exports = { Xacthuc, RegisterUser, LoginUser, Forgot };
