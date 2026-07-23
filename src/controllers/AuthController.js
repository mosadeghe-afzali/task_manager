const { validationResult } = require("express-validator");
const authService = require("../services/AuthService");
const userService = require('../services/UserService');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const register = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const formattedErrors = {};
    errors.array().forEach(err => {
      if (!formattedErrors[err.path]) {
        formattedErrors[err.path] = err.msg;
      }
    });
    return res.status(422).json({
      success: false,
      message: "درخواست شما با خطا مواجه شد.",
      errors: formattedErrors
    });
  }

  try {
    delete req.body.password_confirmation;

    const user = await authService.register(req.body);

    const payload = { id: user.id, email: user.email };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1d' });

    return res.status(201).json({
      success: true,
      message: "ثبت‌نام با موفقیت انجام شد.",
      data: {
        token: token,
        user: { id: user.id, email: user.email, firstName: user.firstName, lastName: user.lastName }
      }
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await userService.find({ field: 'email', value: email })
    if (!user) return res.status(404).json({ success: false, message: "کاربر یافت نشد." });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ success: false, message: "رمز عبور اشتباه است." });

    const payload = { id: user.id, email: user.email };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1d' });

    res.json({
      success: true,
      message: "درخواست با موفقیت انجام شد.",
      data: {
        token: token,
        user: { id: user.id, email: user.email, firstName: user.firstName, lastName: user.lastName }
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

const logout = (req, res, next) => {
  return res.json({ success: true, message: "با موفقیت خارج شدید." });
}

module.exports = {
  login,
  register,
  logout
};
