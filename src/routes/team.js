const express = require("express");
const router = express.Router();
const passport = require("passport");

const TeamController = require("../controllers/TeamController");
const CreateTeamValidator = require("../validators/CreateTeamValidator");
const protect = passport.authenticate("jwt", { session: false });

const teamMemberController = require('../controllers/TeamMemberController');
const addTeamMemberValidator = require('../validators/AddTeamMemberValidator');
router.use(protect);

router
  .route("/:teamId")
  .get(TeamController.show)
  .put(TeamController.update)
  .delete(TeamController.destroy);

router
  .route("/:teamId/members")
  .get(teamMemberController.index)
  .post(addTeamMemberValidator, teamMemberController.store);


module.exports = router;
