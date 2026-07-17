const express = require('express');
const router = express.Router();
const passport = require('passport');

const TeamController = require('../controllers/TeamController');
const CreateTeamValidator = require('../validators/CreateTeamValidator');
const protect = passport.authenticate('jwt', { session: false });

router.use(protect);

router.post('/', CreateTeamValidator, TeamController.store);

module.exports = router;