const { validationResult } = require("express-validator");

const getRegister = (req, res) => {
  res.render("auth/register.ejs", {
    title: "ثبت نام",
  });
};

const register = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.render('auth/register', {
        title: 'ثبت نام',
        success: false,
        errors: errors.array(),
    });
  }
};

const getLogin = (req, res) => {
  res.render("auth/login.ejs", {
    title: "ورود",
  });
};

const login = (req, res) => {};
module.exports = {
  getRegister,
  getLogin,
  login,
  register,
};
