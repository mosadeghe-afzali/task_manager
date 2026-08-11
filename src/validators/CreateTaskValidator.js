const { body } = require("express-validator");
const TeamRepository = require("../repositories/TeamRepository");
const { TaskPriority } = require("@prisma/client");

const CreateTaskValidator = [
  body("projectId")
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
  // --- title ---
  body("title")
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
    .isLength({ min: 3, max: 200 })
    .withMessage((value, { req, path }) =>
      req.t("validation.length", {
        field: req.t("attributes." + path),
        min: 3,
        max: 200,
      }),
    )
    .trim(),
  // --- Description ---
  body("description")
    .optional({ nullable: true, checkFalsy: true })
    .isString()
    .withMessage((value, { req, path }) =>
      req.t("validation.string", {
        field: req.t("attributes." + path),
      }),
    )
    .isLength({ max: 6000 })
    .withMessage((value, { req, path }) =>
      req.t("validation.max", {
        // در صورت نیاز از validation.max استفاده کنید
        field: req.t("attributes." + path),
        max: 6000,
      }),
    )
    .trim(),
  body('teamId')
    .optional({ nullable: true, checkFalsy: true })
    .isInt({ min: 1 }).withMessage((value, { req, path }) =>
      req.t('validation.integer', {
        field: req.t('attributes.' + path)
      })
    )
    .toInt()
    .custom(async (value, { req, path }) => {
      const team = await teamRepository.find({
        field: 'id',
        value
      });

      if (!team) {
        throw new Error(
          req.t('validation.exists', {
            field: req.t('attributes.' + path)
          })
        );
      }
      return true;
    }),
  body('assigneeId')
    .optional({ nullable: true, checkFalsy: true })
    .isInt({ min: 1 }).withMessage((value, { req, path }) =>
      req.t('validation.integer', {
        field: req.t('attributes.' + path)
      })
  ),
  body('requesterId')
    .optional({ nullable: true, checkFalsy: true })
    .isInt({ min: 1 }).withMessage((value, { req, path }) =>
      req.t('validation.integer', {
        field: req.t('attributes.' + path)
      })
  ),
    body('proority')
      .default('low')
      .notEmpty().withMessage((value, { req, path }) =>
        req.t('validation.required', { field: req.t('attributes.' + path) })
      )
      .isString().withMessage((value, { req, path }) =>
        req.t('validation.string', { field: req.t('attributes.' + path) })
      )
      .isIn(Object.values(TaskPriority)).withMessage((value, { req, path }) =>
        req.t('validation.enum', {
          field: req.t('attributes.' + path),
          values: Object.values(TaskPriority).join(', ')
        })
      )
      .trim(),

  // --- Start Date ---
  body("startDate")
    .optional({ nullable: true, checkFalsy: true })
    .isISO8601()
    .withMessage((value, { req, path }) =>
      req.t("validation.date", { field: req.t("attributes." + path) }),
    )
    .toDate(),
  body('estimatedHours')
    .optional({ nullable: true, checkFalsy: true })
    .isNumeric().withMessage((value, { req, path }) =>
      req.t('validation.integer', {
        field: req.t('attributes.' + path)
      })
    )
    .toFloat()
    .custom((value) => {
      if (value < 0) {
        throw new Error('تخمین زمان نمی‌تواند منفی باشد.');
      }
      return true;
    })
  .trim(),

  // --- due Date ---
  body("dueDate")
    .optional({ nullable: true, checkFalsy: true })
    .isISO8601()
    .withMessage((value, { req, path }) =>
      req.t("validation.date", { field: req.t("attributes." + path) }),
    )
    .toDate()
    .custom((value, { req }) => {
      if (req.body.startDate && value) {
        if (new Date(value) < new Date(req.body.startDate)) {
          throw new Error(
            req.t("validation.after_date", {
              field: req.t("attributes.dueDate"),
              after: req.t("attributes.startDate"),
            }),
          );
        }
      }
      return true;
    }),

  // --- Status ---
  body("statusId")
    .trim(),
];

module.exports = CreateTaskValidator;
