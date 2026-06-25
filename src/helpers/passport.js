const passport = require('passport')
const userRepository = require('../repositories/UserRepository')
const LocalStrategy = require('passport-local').Strategy

passport.use(new LocalStrategy(
  {
    usernameField: 'email',
    passwordField: 'password'
  },
  async (email, password, done) => {
    try {
      const user = await userRepository.find({ field: 'email', value: email })

      if (!user) {
        return done(null, false, { message: 'ایمیل یا رمز عبور اشتباه است.' });
      }

      const isMatch = await userRepository.verifyPassword(user, password);
      if (!isMatch) {
        return done(null, false, { message: 'ایمیل یا رمز عبور اشتباه است.' });
      }

      return done(null, user);
    } catch (err) {
      return done(err);
    }
  }
));


passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await userRepository.find({ field: 'id', value: id })
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

module.exports = passport;