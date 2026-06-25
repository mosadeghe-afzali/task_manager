const { validationResult } = require("express-validator");
const authService = require("../services/AuthService");
const passport = require('passport')

const getRegister = (req, res) => {
  res.render("auth/register.ejs", {
    title: "ثبت نام",
    errors: [],
  });
};

const register = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.render("auth/register", {
      title: "ثبت نام",
      success: false,
      errors: errors.array(),
      request: req.body,
    });
  }

  try {
    delete req.body.password_confirmation;
    console.log(req.body, 'bodddyyyyyyyyy')
    const user = await authService.register(req.body);

    req.login(user, (err) => {
      if (err) return next(err);
      
      console.log("کاربر با موفقیت ثبت نام و لاگین شد");
      return res.redirect('/');
    });

  } catch (error) {
    console.error(error);
    next(error);
  }
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
