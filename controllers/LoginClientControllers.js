const bcrypt = require("bcryptjs");
const SendMail = require("../helpers/nodemailer");
const randomCode = require("../helpers/randomCode");
const emailTemplate = require("../helpers/emailTemplate");
const Code = require("../models/CodeModel");
const User = require("../models/UserModel");
const Item = require("../models/itemModel");
const Huyhieu = require("../models/huyhieuModel");
const Follow = require("../models/followModel");
const Course = require("../models/courseModel");

const Xacthuc = async (req, res) => {
  const email = req.body.email;
  const code = randomCode();
  const subject = "CNCODE | MÃ XÁC THỰC EMAIL";
  const html = emailTemplate(code);

  let data = await SendMail(email, subject, html);

  if (data.EC === 0) {
    const codeNumbers = new Code({
      code: code,
    });
    await codeNumbers.save();

    return res.json({
      EM: data.EM,
      EC: data.EC,
      DT: data.DT,
    });
  } else {
    return res.json({
      EM: data.EM,
      EC: data.EC,
      DT: data.DT,
    });
  }
};

const RegisterUser = async (req, res) => {
  const { fullName, email, username, password, code } = req.body;
  const codeNumbers = await Code.findOne({ code });
  const hashedPassword = await bcrypt.hash(password, 10);

  if (!email || !fullName || !username || !password || !code) {
    return res.json({
      EM: "Những thông tin bạn nhập là không đủ để đăng ký tài khoản",
      EC: -1,
      DT: "",
    });
  }

  const isEmail = await User.findOne({ email });
  if (isEmail) {
    return res.json({
      EM: "Email này đã được đăng ký tài khoản trên hệ thống rồi",
      EC: -1,
      DT: "",
    });
  }

  const isUsername = await User.findOne({ username });
  if (isUsername) {
    return res.json({
      EM: "Đã có người dùng lựa chọn tên này, bạn vui lòng chọn tên khác",
      EC: -1,
      DT: "",
    });
  }

  if (codeNumbers.code !== code) {
    return res.json({
      EM: "Mã xác thực bạn nhập là không chính xác",
      EC: -1,
      DT: "",
    });
  }

  // Tạo bản ghi trống cho Role, Item, Huyhieu, Follow, Course
  const newItem = new Item({});
  const newHuyhieu = new Huyhieu({});
  const newFollow = new Follow({});
  const newCourse = new Course({});

  await Promise.all([
    newItem.save(),
    newHuyhieu.save(),
    newFollow.save(),
    newCourse.save(),
  ]);

  // Tạo User mới và lưu ID của các bản ghi vào user
  const user = new User({
    email: email,
    fullName: fullName,
    username: username,
    password: hashedPassword,
    coins: "0",
    avatar:
      "https://res.cloudinary.com/dckuqnehz/image/upload/v1740879702/uploads/img/18-01-2025/g354ky1ob557wmdz6sca",
    itemId: newItem._id,
    huyhieuId: newHuyhieu._id,
    followId: newFollow._id,
    courseId: newCourse._id,
  });

  await user.save();

  return res.json({
    EM: "Đã đăng ký tài khoản thành công!",
    EC: 0,
    DT: {
      fullName: user.fullName,
      tokenUser: user.tokenUser,
      username: user.username,
      role: user.role,
      id: user._id,
    },
  });
};

const LoginUser = async (req, res) => {
  const { fullName, username, password } = req.body;

  const user = await User.findOne({ fullName, username });

  if (!user) {
    return res.json({
      EM: "Họ tên hoặc tên đăng nhập không chính xác",
      EC: -1,
      DT: "",
    });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.json({
      EM: "Mật khẩu không đúng",
      EC: -1,
      DT: "",
    });
  }

  return res.json({
    EM: "Đăng nhập thành công",
    EC: 0,
    DT: {
      fullName: user.fullName,
      tokenUser: user.tokenUser,
      username: user.username,
      role: user.role,
      id: user._id,
    },
  });
};

const Forgot = async (req, res) => {
  const { email, code, password } = req.body;
  const codeNumbers = await Code.findOne({ code });
  const hashedPassword = await bcrypt.hash(password, 10);

  if (!email || !code || !password) {
    return res.json({
      EM: "Những thông tin bạn nhập là không đủ để đăng ký tài khoản",
      EC: -1,
      DT: "",
    });
  }

  if (codeNumbers.code !== code) {
    return res.json({
      EM: "Mã xác thực bạn nhập là không chính xác",
      EC: -1,
      DT: "",
    });
  }

  await User.updateOne({ email }, { $set: { password: hashedPassword } });

  return res.json({
    EM: "Đã thay đổi mật khẩu thành công!",
    EC: 0,
    DT: "",
  });
};

module.exports = {
  Xacthuc,
  RegisterUser,
  LoginUser,
  Forgot,
};
