const express = require("express");
const router = express.Router();
const passport = require("passport");

const taskController = require("../controllers/taskController");

const createTaskValidator = require("../validators/CreateTaskValidator");
const { create } = require("../repositories/TeamRepository");


const protect = passport.authenticate("jwt", { session: false });

router.use(protect);

router
  .route("/")
  .get(taskController.index)
  .post(createTaskValidator, taskController.store);

module.exports = router;
