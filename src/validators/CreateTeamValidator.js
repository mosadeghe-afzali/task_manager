const { body } = require("express-validator");
const userRepository = require("../repositories/UserRepository");
const UserRepository = require("../repositories/UserRepository");

const CreateTeamValidator = [
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
    .trim(),

  body("slug")
    .isLength({ min: 2, max: 250 })
    .withMessage((value, { req, path }) =>
      req.t("validation.length", {
        field: req.t("attributes." + path),
        min: 2,
        max: 250,
      }),
    )
    .isString()
    .withMessage((value, { req, path }) =>
      req.t("validation.string", {
        field: req.t("attributes." + path),
      }),
    )
    .trim(),
  body("userIds")
    .notEmpty()
    .withMessage((value, { req, path }) =>
      req.t("validation.required", { field: req.t("attributes." + path) }),
    )
    .isArray()
    .withMessage((value, { req, path }) =>
      req.t("validation.array", { field: req.t("attributes." + path) }),
    )
    .custom(async (userIdsArray, { req, path }) => {
      userIdsArray.map((id) => {
        const userId = parseInt(id);
        const user = UserRepository.find({ field: "id", value: userId });
        if (!user) {
          throw new Error(
            req.t("validation.exists", { field: req.t("attributes." + path) }),
          );
        }
      });

      return true;
    }),
];

module.exports = CreateTeamValidator;
