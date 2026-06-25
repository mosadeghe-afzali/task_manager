const express = require('express');
const HomePageController = require('../controllers/HomePageController');
const AuthController = require('../controllers/AuthController');
const { isAuthenticated } = require('../middlewares/CheckAuthentication');
const Registervalidator = require('../validators/RegisterValidator')

const router = express.Router();

router.get('/', isAuthenticated, HomePageController);
router.get('/register', AuthController.getRegister);
router.post('/register', Registervalidator, AuthController.register);

router.get('/login', AuthController.getLogin);
router.post('/login', AuthController.login);
router.get('/logout', AuthController.logout);

module.exports = router;