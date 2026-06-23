const { validationResult } = require("express-validator");
const authService = require("../services/AuthService");
const getRegister = (req, res) => {
  res.render("auth/register.ejs", {
    title: "ثبت نام",
    errors: [],
  });
};

const register = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.render("auth/register", {
      title: "ثبت نام",
      success: false,
      errors: errors.array(),
      request: req.body,
    });
  }
  delete req.body.password_confirmation;
  console.log(req.body);
  const user = await authService.register(req.body);
  console.log("userrrrrrrrrrrrr", user);

  res.render("auth/register.ejs", {
    title: "ثبت نام",
    errors: [],
    user: user,
  });
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
