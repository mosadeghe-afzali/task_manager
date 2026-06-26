const { body } = require('express-validator');
const TeamRepository = require('../repositories/TeamRepository');

const CreateProjectValidator = [
  body('name')
    .notEmpty().withMessage((value, { req, path }) =>
      req.t('validation.required', {
        field: req.t('attributes.' + path)
      })
    )
    .isLength({ min: 2, max: 500 }).withMessage((value, { req, path }) =>
      req.t('validation.length', {
        field: req.t('attributes.' + path),
        min: 2, max: 500
      })
    )
    .isString().withMessage((value, { req, path }) =>
      req.t('validation.string',
        {
          field: req.t('attributes.' + path)
        })
    )
    .trim(),

  body('description')
    .isLength({ min: 5, max: 5000 }).withMessage((value, { req, path }) =>
      req.t('validation.length', {
        field: req.t('attributes.' + path),
        min: 2, max: 500
      })
    )
    .isString().withMessage((value, { req, path }) =>
      req.t('validation.string',
        {
          field: req.t('attributes.' + path)
        }
      )
    )
    .trim(),
  body('teamId')
    .notEmpty().withMessage((value, { req, path }) =>
      req.t('validation.required', {
        field: req.t('attributes.' + path)
      })
    )
    .isNumeric().withMessage((value, { req, path }) =>
      req.t('validation.numeric',
        {
          field: req.t('attributes.' + path)
        }
      )
    )
    .custom(async (value, { req, path }) => {
      const teamExists = await TeamRepository.find({ field: 'id', value: parseInt(value) });
      console.log(teamExists)
      if (!teamExists) {
        throw new Error(req.t('validation.exists', { field: req.t('attributes.' + path) }));
      }
      return true;
    })
];


module.exports = CreateProjectValidator;

