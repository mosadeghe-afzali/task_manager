const express = require("express");
const router = express.Router();
const passport = require("passport");

const TeamController = require("../controllers/TeamController");
const CreateTeamValidator = require("../validators/CreateTeamValidator");
const protect = passport.authenticate("jwt", { session: false });

router.use(protect);

router
  .route("/:teamId")
  .get(TeamController.show)
  .put(TeamController.update)
  .delete(TeamController.destroy);

  
module.exports = router;
