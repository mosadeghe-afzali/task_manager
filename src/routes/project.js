const express = require('express');
const router = express.Router();
const passport = require('passport');

const projectController = require('../controllers/ProjectController');
const projectMemberController = require('../controllers/ProjectMemberController');

const createProjectValidator = require('../validators/CreateProjectValidator');
const updateProjectValidator = require('../validators/UpdateProjectValidator');
const addProjectMemberValidator = require('../validators/AddProjectMemberValidator'); 

const protect = passport.authenticate('jwt', { session: false });

router.use(protect);

router.route('/')
    .get(projectController.index)
    .post(createProjectValidator, projectController.store);

router.route('/:projectId')
    .get(projectController.show)
    .put(updateProjectValidator, projectController.update)
    .delete(projectController.destroy);


router.route('/:projectId/members')
    .get(projectMemberController.index)
    .post(addProjectMemberValidator, projectMemberController.store);

router.route('/:projectId/members/:memberId')
    .delete(projectMemberController.destroy);

module.exports = router;