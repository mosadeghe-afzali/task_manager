const { body, param } = require("express-validator");
const projectMemberRepository = require("../repositories/ProjectMemberRepository");
const commentRepository = require('../repositories/CommentRepository');
const TaskRepository = require("../repositories/TaskRepository");

const UpdateCommentValidator = [
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
    .toInt(),
  param("commentId")
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
      const comment = await commentRepository.find({
        field: "id",
        value,
      });

      if (!comment) {
        throw new Error(
          req.t("validation.exists", {
            field: req.t("attributes." + path),
          }),
        );
      }
      if (comment.userId != parseInt(req.body.userId)) {
        throw new Error(
          req.t("validation.belongsTo", {
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

module.exports = UpdateCommentValidator;
