const { body, param } = require("express-validator");
const TeamRepository = require("../repositories/TeamRepository");
const projectRepository = require("../repositories/ProjectRepository");

console.log(body);
const CreateTeamValidator = [
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
      const existingTeam = await TeamRepository.search({
        where: {
          projectId: Number(projectId),
          name: value,
        },
      });
      console.log(existingTeam, value)
      if (existingTeam) {
        throw new Error(
          req.t("validation.unique", {
            field: req.t("attributes." + path),
          }),
        );
      }
      return true;
    })

    .trim(),

  body("description")
    .optional({ nullable: true, checkFalsy: true })
    .isLength({ min: 5, max: 6000 })
    .withMessage((value, { req, path }) =>
      req.t("validation.length", {
        field: req.t("attributes." + path),
        min: 5,
        max: 6000,
      }),
    )
    .isString()
    .withMessage((value, { req, path }) =>
      req.t("validation.string", {
        field: req.t("attributes." + path),
      }),
    )
    .trim(),
];

module.exports = CreateTeamValidator;
