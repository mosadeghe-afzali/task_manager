const express = require('express');
const router = express.Router();
const passport = require('passport');

const userController = require('../controllers/UserController');
const protect = passport.authenticate('jwt', { session: false });

router.use(protect);

router.route('/')
  .get(userController.index)

module.exports = router;