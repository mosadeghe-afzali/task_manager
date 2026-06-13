const express = require('express');
const HomePageController = require('../controllers/HomePageController');
const router = express.Router();

router.get('/', HomePageController);

module.exports = router;