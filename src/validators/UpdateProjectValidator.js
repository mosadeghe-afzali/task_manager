const { body } = require('express-validator');
const { ProjectStatus } = require("@prisma/client");

const updateProjectValidator = [
  body('name')
    .notEmpty().withMessage((value, { req, path }) =>
      req.t('validation.required', {
        field: req.t('attributes.' + path)
      })
    )
    .isString().withMessage((value, { req, path }) =>
      req.t('validation.string', {
        field: req.t('attributes.' + path)
      })
    )
    .isLength({ min: 3, max: 100 }).withMessage((value, { req, path }) =>
      req.t('validation.length', {
        field: req.t('attributes.' + path),
        min: 3, 
        max: 100
      })
    )
    .trim(),
  body('key')
    .notEmpty().withMessage((value, { req, path }) =>
      req.t('validation.required', {
        field: req.t('attributes.' + path)
      })
    )
    .isString().withMessage((value, { req, path }) =>
      req.t('validation.string', {
        field: req.t('attributes.' + path)
      })
    )
    .toUpperCase() // تبدیل خودکار به حروف بزرگ
    .matches(/^[A-Z][A-Z0-9]*$/).withMessage((value, { req, path }) =>
      req.t('validation.regex', { // حتماً کلید validation.regex را در فایل‌های ترجمه اضافه کنید
        field: req.t('attributes.' + path)
      })
    )
    .isLength({ min: 2, max: 10 }).withMessage((value, { req, path }) =>
      req.t('validation.length', {
        field: req.t('attributes.' + path),
        min: 2, 
        max: 10
      })
    )
    .trim(),
  body('description')
    .optional({ nullable: true, checkFalsy: true })
    .isString().withMessage((value, { req, path }) =>
      req.t('validation.string', {
        field: req.t('attributes.' + path)
      })
    )
    .isLength({ max: 2000 }).withMessage((value, { req, path }) =>
      req.t('validation.max', { // در صورت نیاز از validation.max استفاده کنید
        field: req.t('attributes.' + path),
        max: 2000
      })
    )
    .trim(),
  body('icon')
    .optional({ nullable: true, checkFalsy: true })
    .default('folder') // مقدار پیش‌فرض در صورت عدم ارسال
    .isString().withMessage((value, { req, path }) =>
      req.t('validation.string', {
        field: req.t('attributes.' + path)
      })
    )
    .isIn(['folder', 'shopping-cart', 'users', 'code', 'finance']).withMessage((value, { req, path }) =>
      req.t('validation.enum', {
        field: req.t('attributes.' + path),
        values: 'folder, shopping-cart, users, code'
      })
    )
    .trim(),
  body('startDate')
    .optional({ nullable: true, checkFalsy: true })
    .isISO8601().withMessage((value, { req, path }) =>
      req.t('validation.date', { field: req.t('attributes.' + path) })
    )
    .toDate(),
  body('endDate')
    .optional({ nullable: true, checkFalsy: true })
    .isISO8601().withMessage((value, { req, path }) =>
      req.t('validation.date', { field: req.t('attributes.' + path) })
    )
    .toDate()
    .custom((value, { req }) => {
      // فقط زمانی چک می‌شود که هر دو تاریخ وارد شده باشند
      if (req.body.startDate && value) {
        if (new Date(value) < new Date(req.body.startDate)) {
          throw new Error(req.t('validation.after_date', { 
            field: req.t('attributes.endDate'), 
            after: req.t('attributes.startDate') 
          }));
        }
      }
      return true;
    }),
  body('status')
    .default('ACTIVE') // مقدار پیش‌فرض
    .notEmpty().withMessage((value, { req, path }) =>
      req.t('validation.required', { field: req.t('attributes.' + path) })
    )
    .isString().withMessage((value, { req, path }) =>
      req.t('validation.string', { field: req.t('attributes.' + path) })
    )
    .isIn(Object.values(ProjectStatus)).withMessage((value, { req, path }) =>
      req.t('validation.enum', { 
        field: req.t('attributes.' + path),
        values: Object.values(ProjectStatus).join(', ')
      })
    )
    .trim()
];

module.exports = updateProjectValidator;