const { body } = require("express-validator");
const TeamRepository = require("../repositories/TeamRepository");
const { TaskPriority } = require("@prisma/client");

const projectRepository = require("../repositories/ProjectRepository");
const projectMemberRepository = require("../repositories/ProjectMemberRepository");
const taskStatusRepository = require('../repositories/TaskStatusRepository');

const UpdateTaskValidator = [
  // --- Title ---
  body("title")
    .optional()
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
        field: req.t("attributes." + path),
        max: 6000,
      }),
    )
    .trim(),

  // --- Team ID ---
  body('teamId')
    .optional({ nullable: true, checkFalsy: true })
    .isInt({ min: 1 })
    .withMessage((value, { req, path }) =>
      req.t('validation.integer', {
        field: req.t('attributes.' + path)
      })
    )
    .toInt()
    .custom(async (value, { req, path }) => {
      const team = await TeamRepository.find({
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

  // --- Assignee ID ---
  body('assigneeId')
    .optional({ nullable: true, checkFalsy: true })
    .isInt({ min: 1 })
    .withMessage((value, { req, path }) =>
      req.t('validation.integer', {
        field: req.t('attributes.' + path)
      })
    )
    .custom(async (value, { req, path }) => {
      const projectId = req.body.projectId; // اگر ارسال نشده باشد می‌توانید از دیتابیس بگیرید
      if (!projectId) return true;

      const projectMember = await projectMemberRepository.findFirst({
        userId: value,
        projectId: projectId
      });

      if (!projectMember) {
        throw new Error(
          req.t('validation.exists', {
            field: req.t('attributes.' + path)
          })
        );
      }
    }),

  // --- Priority ---
  body('priority')
    .optional()
    .isString()
    .withMessage((value, { req, path }) =>
      req.t('validation.string', { field: req.t('attributes.' + path) })
    )
    .isIn(Object.values(TaskPriority))
    .withMessage((value, { req, path }) =>
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

  // --- Estimated Hours ---
  body('estimatedHours')
    .optional({ nullable: true, checkFalsy: true })
    .isNumeric()
    .withMessage((value, { req, path }) =>
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
    }),

  // --- Spent Hours (مفید برای آپدیت تسک) ---
  body('spentHours')
    .optional({ nullable: true, checkFalsy: true })
    .isNumeric()
    .withMessage((value, { req, path }) =>
      req.t('validation.integer', {
        field: req.t('attributes.' + path)
      })
    )
    .toFloat()
    .custom((value) => {
      if (value < 0) {
        throw new Error('ساعت‌های صرف‌شده نمی‌تواند منفی باشد.');
      }
      return true;
    }),

  // --- Due Date ---
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

  // --- Status ID ---
  body("statusId")
    .optional()
    .isInt({ min: 1 })
    .withMessage((value, { req, path }) =>
      req.t("validation.integer", {
        field: req.t("attributes." + path),
      }),
    )
    .toInt()
    .custom(async (value, { req, path }) => {
      const status = await taskStatusRepository.find({
        field: "id",
        value,
      });

      if (!status) {
        throw new Error(
          req.t("validation.exists", {
            field: req.t("attributes." + path),
          }),
        );
      }

      return true;
    }),
];

module.exports = UpdateTaskValidator;