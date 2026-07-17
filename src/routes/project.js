const express = require('express');
const router = express.Router();
const passport = require('passport');

const projectController = require('../controllers/ProjectController');
const createProjectValidator = require('../validators/CreateProjectValidator');
const updateProjectValidator = require('../validators/UpdateProjectValidator');
const protect = passport.authenticate('jwt', { session: false });

router.use(protect);

router.route('/')
    .get(projectController.index)
    .post(createProjectValidator, projectController.store);

router.route('/:projectId')
    .get(projectController.show)
    .put(updateProjectValidator, projectController.update)
    .delete(projectController.destroy);

module.exports = router;