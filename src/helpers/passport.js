
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const userRepository = require('../repositories/UserRepository')

const opts = {
    // توکن را از هدر Authorization به صورت Bearer Token استخراج می‌کند
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET || 'YOUR_SUPER_SECRET_KEY'
};

module.exports = (passport) => {
    passport.use(
        new JwtStrategy(opts, async (jwt_payload, done) => {
            try {
                // پیدا کردن کاربر بر اساس شناسه ذخیره شده در توکن
                const user = await userRepository.find({ field: 'id', value: jwt_payload.id })
                if (user) {
                    return done(null, user);
                }
                return done(null, false);
            } catch (err) {
                return done(err, false);
            }
        })
    );
};
// const passport = require('passport')
// const userRepository = require('../repositories/UserRepository')
// const LocalStrategy = require('passport-local').Strategy

// passport.use(new LocalStrategy(
//   {
//     usernameField: 'email',
//     passwordField: 'password'
//   },
//   async (email, password, done) => {
//     try {
//       const user = await userRepository.find({ field: 'email', value: email })

//       if (!user) {
//         return done(null, false, { message: 'ایمیل یا رمز عبور اشتباه است.' });
//       }

//       const isMatch = await userRepository.verifyPassword(user, password);
//       if (!isMatch) {
//         return done(null, false, { message: 'ایمیل یا رمز عبور اشتباه است.' });
//       }

//       return done(null, user);
//     } catch (err) {
//       return done(err);
//     }
//   }
// ));


// passport.serializeUser((user, done) => {
//   done(null, user.id);
// });

// passport.deserializeUser(async (id, done) => {
//   try {
//     const user = await userRepository.find({ field: 'id', value: id })
//     done(null, user);
//   } catch (err) {
//     done(err, null);
//   }
// });

// module.exports = passport;