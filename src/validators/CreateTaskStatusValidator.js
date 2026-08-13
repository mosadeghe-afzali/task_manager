const { body, param } = require("express-validator");
const projectRepository = require("../repositories/ProjectRepository");
const taskStatusRepository = require('../repositories/TaskStatusRepository');
const { name } = require("ejs");
console.log(body);
const CreateTaskStatusValidator = [
  param("projectId")
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
      const project = await projectRepository.find({
        field: "id",
        value,
      });

      if (!project) {
        throw new Error(
          req.t("validation.exists", {
            field: req.t("attributes." + path),
          }),
        );
      }

      return true;
    }),
  body("name")
    .notEmpty()
    .withMessage((value, { req, path }) =>
      req.t("validation.required", {
        field: req.t("attributes." + path),
      }),
    )
    .isLength({ min: 2, max: 500 })
    .withMessage((value, { req, path }) =>
      req.t("validation.length", {
        field: req.t("attributes." + path),
        min: 2,
        max: 500,
      }),
    )
    .isString()
    .withMessage((value, { req, path }) =>
      req.t("validation.string", {
        field: req.t("attributes." + path),
      }),
    )
    .custom(async (value, { req, path }) => {
      const projectId = req.params.projectId;
      const existingStatus = await taskStatusRepository.find({
        field: 'projectId_name',
        value: {
          projectId: projectId,
          name: value
        }
      });
      console.log(existingStatus, value);
      if (existingStatus) {
        throw new Error(
          req.t("validation.unique", {
            field: req.t("attributes." + path),
          }),
        );
      }
      return true;
    })

    .trim(),
  body("color")
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
    .isLength({ max: 50 })
    .withMessage((value, { req, path }) =>
      req.t("validation.max_length", {
        field: req.t("attributes." + path),
        max: 50,
      }),
    )
    .trim(),

  body("sortOrder")
    .notEmpty()
    .withMessage((value, { req, path }) =>
      req.t("validation.required", {
        field: req.t("attributes." + path),
      }),
    )
    .isInt()
    .withMessage((value, { req, path }) =>
      req.t("validation.integer", {
        field: req.t("attributes." + path),
      }),
    )
    .toInt(),
];

module.exports = CreateTaskStatusValidator;
