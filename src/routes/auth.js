const express = require('express');
const router = express.Router();
const passport = require('passport');

const AuthController = require('../controllers/AuthController');
const Registervalidator = require('../validators/RegisterValidator');
const protect = passport.authenticate('jwt', { session: false });

router.post('/register', Registervalidator, AuthController.register);
router.post('/login', AuthController.login);
router.post('/logout', protect, AuthController.logout);

module.exports = router;