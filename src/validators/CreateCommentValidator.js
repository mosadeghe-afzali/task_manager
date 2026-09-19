const { body, param } = require("express-validator");
const TeamRepository = require("../repositories/TeamRepository");
const { TaskPriority } = require("@prisma/client");

const projectRepository = require("../repositories/ProjectRepository");
const projectMemberRepository = require("../repositories/ProjectMemberRepository");
const taskStatusRepository = require('../repositories/TaskStatusRepository');
const TaskRepository = require("../repositories/TaskRepository");

const CreateCommentValidator = [
  param("taskId")
    .notEmpty()
    .withMessage((value, { req, path }) =>
      req.t("validation.required", {
        field: req.t("attributes." + path),
      }),
    )
    .isInt({ min: 1 })
    .withMessage((value, { req, path }) =>
      req.t("validation.integer", {
        field: req.t("attributes." + path),
      }),
    )
    .toInt()
    .custom(async (value, { req, path }) => {
      const task = await TaskRepository.find({
        field: "id",
        value,
      });

      if (!task) {
        throw new Error(
          req.t("validation.exists", {
            field: req.t("attributes." + path),
          }),
        );
      }
      req.projectId = task.projectId;

      return true;
    }),
  body("userId")
    .notEmpty()
    .withMessage((value, { req, path }) =>
      req.t("validation.required", {
        field: req.t("attributes." + path),
      }),
    )
    .isInt({ min: 1 })
    .withMessage((value, { req, path }) =>
      req.t("validation.integer", {
        field: req.t("attributes." + path),
      }),
    )
    .toInt()
    .custom(async (value, { req, path }) => {
      const user = await projectMemberRepository.findFirst({
        userId: value,
        projectId: req.projectId
      });
      if (!user) {
        throw new Error(
          req.t("validation.exists", {
            field: req.t("attributes." + path),
          }),
        );
      }

      return true;
    }),
  // --- content ---
  body("content")
    .notEmpty()
    .withMessage((value, { req, path }) =>
      req.t("validation.required", {
        field: req.t("attributes." + path),
      }),
    )
    .isString()
    .withMessage((value, { req, path }) =>
      req.t("validation.string", {
        field: req.t("attributes." + path),
      }),
    )
    .isLength({ max: 6000 })
    .withMessage((value, { req, path }) =>
      req.t("validation.max", {
        field: req.t("attributes." + path),
        max: 6000,
      }),
    )
    .trim(),
];

module.exports = CreateCommentValidator;
