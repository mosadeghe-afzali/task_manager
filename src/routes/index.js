const express = require('express');
const passport = require('passport');

const AuthController = require('../controllers/AuthController');
const ProjectController = require('../controllers/ProjectController');
const TeamController = require('../controllers/TeamController');

const Registervalidator = require('../validators/RegisterValidator')
const CreateProjectValidator = require('../validators/CreateProjectValidator');
const CreateTeamValidator = require('../validators/CreateTeamValidator');

const router = express.Router();
const protect = passport.authenticate('jwt', { session: false });


router.post('/register', Registervalidator, AuthController.register);
router.post('/login', AuthController.login);
router.post('/logout', protect,  AuthController.logout);

router.post('/projects', protect, CreateProjectValidator, ProjectController.store)
router.get('/projects', protect , ProjectController.index)

router.post('/teams', protect, CreateTeamValidator, TeamController.store)

module.exports = router;