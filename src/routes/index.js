const express = require('express');
const HomePageController = require('../controllers/HomePageController');
const AuthController = require('../controllers/AuthController');
const router = express.Router();

router.get('/', HomePageController);
router.get('/register', AuthController.getRegister);
router.get('/login', AuthController.getLogin);
module.exports = router;