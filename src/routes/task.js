const express = require("express");
const router = express.Router();
const passport = require("passport");

const taskController = require("../controllers/taskController");

const createTaskValidator = require("../validators/CreateTaskValidator");
const updateTaskValidator = require("../validators/UpdateTaskValidator");
const { create } = require("../repositories/TeamRepository");

const commentController = require("../controllers/CommentController");
const createCommentValidator = require("../validators/CreateCommentValidator");
const updateCommentValidator = require("../validators/UpdateCommentValidator");

const protect = passport.authenticate("jwt", { session: false });

router.use(protect);

router
  .route("/")
  .get(taskController.index)
  .post(createTaskValidator, taskController.store);

router.route("/priorities").get(taskController.taskPriorities);

router
  .route("/:taskId")
  .get(taskController.show)
  .put(updateTaskValidator, taskController.update)

router
  .route("/:taskId/comments")
  .get(commentController.index)
  .post(createCommentValidator, commentController.store)

router
  .route("/:taskId/comments/commentId")
  .get(commentController.show)
  .put(updateCommentValidator, commentController.update)
module.exports = router;
