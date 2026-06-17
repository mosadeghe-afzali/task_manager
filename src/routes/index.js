const express = require('express');
const HomePageController = require('../controllers/HomePageController');
const AuthController = require('../controllers/AuthController');
const router = express.Router();
const Registervalidator = require('../validators/RegisterValidator')
router.get('/', HomePageController);
router.get('/register' , AuthController.getRegister);
router.post('/register', Registervalidator , AuthController.register);

router.get('/login', AuthController.getLogin);
module.exports = router;