const express = require('express');
const HomePageController = require('../controllers/HomePageController');
const AuthController = require('../controllers/AuthController');
const { isAuthenticated } = require('../middlewares/CheckAuthentication');
const Registervalidator = require('../validators/RegisterValidator')
const ProjectController = require('../controllers/PorjectController');
const CreateProjectValidator = require('../validators/CreateProjectValidator');
const TeamController = require('../controllers/TeamController');
const CreateTeamValidator = require('../validators/CreateTeamValidator');
const router = express.Router();

router.get('/', isAuthenticated, HomePageController);
router.get('/register', AuthController.getRegister);
router.post('/register', Registervalidator, AuthController.register);

router.get('/login', AuthController.getLogin);
router.post('/login', AuthController.login);
router.get('/logout', AuthController.logout);

router.get('/projects/create', ProjectController.create)
router.post('/projects', CreateProjectValidator, ProjectController.store)

router.get('/teams/create', TeamController.create)
router.post('/teams', CreateTeamValidator, TeamController.store)

module.exports = router;