const tryCatch = require("../utils/TryCatch");
const { Request, Response } = require("express");
const { StandardResponse } = require("../dto/StandardResponse");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const { User } = require("../types/SchemaTypes");

const UserModel = require("../model/user.model");

// Route for user registration
exports.signup = tryCatch(async (req, res) => {
  const { adminId, email, password, fullname } = req.body;

  const user = await UserModel.findOne({ email });
  if (user) {
    return res.status(400).json({ message: "User already exists" });
  }

  const hashpassword = await bcrypt.hash(password, 10);
  const newUser = new UserModel({
    adminId,
    fullname,
    email,
    password: hashpassword,
  });

  await newUser.save();

  return res
    .status(201)
    .json({ status: true, message: "User created the account successfully" });
});

exports.login = tryCatch(async (req, res) => {
  const { email, password } = req.body;

  const user = await UserModel.findOne({ email });
  if (!user) {
    return res.status(400).json({ message: "User is not registered" });
  }

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    return res.status(400).json({ message: "Invalid password" });
  }

  const token = jwt.sign(
    { email: user.email, adminId: user.adminId },
    process.env.KEY,
    {
      expiresIn: "24h",
    }
  );

  res.cookie("token", token, { httpOnly: true, maxAge: 360000 });

  return res
    .status(200)
    .json({
      status: true,
      message: "User logged in successfully",
      token: token,
    });
});

// Route for user password reset request
exports.forgotPassword = tryCatch(async (req, res) => {
  const { email, adminId } = req.body;

  const user = await UserModel.findOne({ email });
  if (!user) {
    return res.status(400).json({ message: "User is not registered." });
  }

  // Check if the username matches
  if (user.adminId !== adminId) {
    return res.status(400).json({ message: "Incorrect username or email." });
  }

  const token = jwt.sign(
    { email: user.email, adminId: user.adminId },
    process.env.KEY,
    {
      expiresIn: "5m",
    }
  );

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "rajasooriyakavindhya@gmail.com",
      pass: "necv biwv lruw dvpy",
    },
  });

  const mailOptions = {
    from: "rajasooriyakavindhya@gmail.com",
    to: email,
    subject: "Reset Password",
    text: `http://localhost:5173/resetPassword/${token}`,
  };

  transporter.sendMail(mailOptions, function (error) {
    if (error) {
      return res.json({ message: "Email not sent" });
    } else {
      return res.json({ status: true, message: "Email sent" });
    }
  });
});

// Route for resetting the password
exports.resetPassword = tryCatch(async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  try {
    const decoded = jwt.verify(token, process.env.KEY);

    const decodedEmail = decoded.email;

    const hashPassword = await bcrypt.hash(password, 10);

    await UserModel.findOneAndUpdate(
      { email: decodedEmail },
      { password: hashPassword }
    );

    return res.json({ status: true, message: "Password reset successfully" });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ status: false, message: "Password reset failed or token expired" });
  }
});

// Route to verify the user
exports.verify = tryCatch(async (req, res) => {
  return res.json({ status: true, message: "User is verified" });
});

// Route to logout the user
exports.logout = tryCatch(async (req, res) => {
  return res.json({ status: true, message: "User logged out successfully" });
});
