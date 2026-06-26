const express = require('express');
const HomePageController = require('../controllers/HomePageController');
const AuthController = require('../controllers/AuthController');
const { isAuthenticated } = require('../middlewares/CheckAuthentication');
const Registervalidator = require('../validators/RegisterValidator')
const ProjectController = require('../controllers/PorjectController');
const CreateProjectValidator = require('../validators/CreateProjectValidator');
const router = express.Router();

router.get('/', isAuthenticated, HomePageController);
router.get('/register', AuthController.getRegister);
router.post('/register', Registervalidator, AuthController.register);

router.get('/login', AuthController.getLogin);
router.post('/login', AuthController.login);
router.get('/logout', AuthController.logout);

router.get('/projects/create', ProjectController.create)
router.post('/projects', CreateProjectValidator, ProjectController.store)

module.exports = router;