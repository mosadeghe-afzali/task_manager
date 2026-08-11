const express = require("express");
const router = express.Router();
const passport = require("passport");

const projectController = require("../controllers/ProjectController");
const projectMemberController = require("../controllers/ProjectMemberController");

const createProjectValidator = require("../validators/CreateProjectValidator");
const updateProjectValidator = require("../validators/UpdateProjectValidator");
const addProjectMemberValidator = require("../validators/AddProjectMemberValidator");

const TeamController = require("../controllers/TeamController");
const CreateTeamValidator = require("../validators/CreateTeamValidator");


const taskStatusController = require("../controllers/TaskStatusController");
const createTaskStatusValidator = require("../validators/CreateTaskStatusValidator");

const protect = passport.authenticate("jwt", { session: false });

router.use(protect);

router
  .route("/")
  .get(projectController.index)
  .post(createProjectValidator, projectController.store);

router
  .route("/:projectId")
  .get(projectController.show)
  .put(updateProjectValidator, projectController.update)
  .delete(projectController.destroy);

router
  .route("/:projectId/members")
  .get(projectMemberController.index)
  .post(addProjectMemberValidator, projectMemberController.store);

router
  .route("/:projectId/members")
  .get(projectMemberController.index)
  .post(addProjectMemberValidator, projectMemberController.store);
router.get(
  "/:projectId/members/search",
  projectMemberController.searchMembersToInvite,
);
router
  .route("/:projectId/members/:memberId")
  .delete(projectMemberController.destroy);

router.get(
  "/projects/:projectId/members/search",
  projectMemberController.searchMembersToInvite,
);

router
  .route("/:projectId/teams")
  .get(TeamController.index)
  .post(CreateTeamValidator, TeamController.store);

router.get(
  "/:projectId/teams/:teamId/members/search",
  TeamController.searchMembersToInvite,
);

router
  .route("/:projectId/statuses")
  .get(taskStatusController.index)
  .post(createTaskStatusValidator, taskStatusController.store);

router
  .route("/:projectId/statuses/:statusId")
  .get(taskStatusController.show)
  .put(taskStatusController.update)
  .delete(taskStatusController.destroy)

module.exports = router;
