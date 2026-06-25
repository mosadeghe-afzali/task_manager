const { validationResult } = require("express-validator");
const authService = require("../services/AuthService");
const passport = require('passport')

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
  const user = await authService.register(req);
  console.log("userrrrrrrrrrrrr", user);

  res.render("index.ejs", {
    title: "خانه",
    errors: [],
    user: user,
  });
};

const getLogin = (req, res) => {
  const errors = req.flash('error');

  res.render("auth/login.ejs", {
    title: "ورود",
    error: errors.length > 0 ? errors[0] : null
  });
};

const login = passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login',
  failureFlash: true,
});
const logout = (req, res, next) => {
  req.logout(function(err) {
    if(err) return next(err);

    res.redirect('/login')
  })
  return;
}

module.exports = {
  getRegister,
  getLogin,
  login,
  register,
  logout
};
