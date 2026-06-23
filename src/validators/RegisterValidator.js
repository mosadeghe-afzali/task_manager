const { body, validationResult } = require('express-validator');

const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        req.validationErrors = errors.array();
    }
    next();
};

const Registervalidator = [
    body('name')
        .notEmpty().withMessage((value, { req, path }) => req.t('validation.required', { field: req.t('attributes.' + path) }))
        .isLength({ min: 2 }).withMessage((value, { req, path }) => req.t('validation.minLength', { field: req.t('attributes.' + path), count: 6 }))
        .isString().withMessage((value, { req, path }) => req.t('validation.string', { field: req.t('attributes.' + path) }))
        .trim(),

    body('email')
        .notEmpty().withMessage((value, { req, path }) => req.t('validation.required', { field: req.t('attributes.' + path) }))
        .isEmail().withMessage((value, { req, path }) => req.t('validation.email'))
        .normalizeEmail(),

    body('password')
        .notEmpty().withMessage((value, { req, path }) => req.t('validation.required', { field: req.t('attributes.' + path) }))
        .isLength({ min: 8 }).withMessage((value, { req, path }) => req.t('validation.minLength', { field: req.t('attributes.' + path), count: 8 }))
        .matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)
        .withMessage((value, { req, path }) => req.t('validation.passwordComplexity')),

    body('password_confirmation')
        .notEmpty().withMessage((value, { req, path }) => req.t('validation.required', { field: req.t('attributes.' + path) }))
        .custom((value, { req }) => {
            if (value !== req.body.password) {
                throw new Error(req.t('validation.passwordMismatch'));
            }
            return true;
        }),
    // handleValidationErrors
];

module.exports = Registervalidator;