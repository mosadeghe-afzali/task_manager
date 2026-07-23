const { param, body } = require('express-validator');
const { ProjectRole } = require("@prisma/client");
const projectRepository = require('../repositories/ProjectRepository');
const userRepository = require('../repositories/UserRepository');
console.log(ProjectRole)

const AddProjectMemberValidator = [
  param('projectId')
    .notEmpty().withMessage((value, { req, path }) =>
      req.t('validation.required', {
        field: req.t('attributes.' + path)
      })
    )
    .isInt({ min: 1 }).withMessage((value, { req, path }) =>
      req.t('validation.integer', {
        field: req.t('attributes.' + path)
      })
    )
    .toInt()
    .custom(async (value, { req, path }) => {
      const project = await projectRepository.find({
        field: 'id',
        value
      });

      if (!project) {
        throw new Error(
          req.t('validation.exists', {
            field: req.t('attributes.' + path)
          })
        );
      }

      return true;
    }),
  body('userIds')
    .notEmpty().withMessage((value, { req, path }) =>
      req.t('validation.required', {
        field: req.t('attributes.' + path)
      })
    )
    .isArray({ min: 1 }).withMessage((value, { req, path }) =>
      req.t('validation.array', {
        field: req.t('attributes.' + path)
      })
    )
    .custom(async (userIds, { req, path }) => {
      const existingUsers = await userRepository.findWhereIn('id', userIds);

      if (!existingUsers || existingUsers.length !== userIds.length) {
        throw new Error(
          req.t('validation.exists', {
            field: req.t('attributes.' + path)
          })
        );
      }

    return true;
  }),
  body('userIds.*')
    .isInt({ min: 1 }).withMessage((value, { req, path }) =>
      req.t('validation.integer', {
        field: req.t('attributes.' + path)
      })
  ),
  body('role')
    .default('member')
    .notEmpty().withMessage((value, { req, path }) =>
      req.t('validation.required', { field: req.t('attributes.' + path) })
    )
    .isString().withMessage((value, { req, path }) =>
      req.t('validation.string', { field: req.t('attributes.' + path) })
    )
    .isIn(Object.values(ProjectRole)).withMessage((value, { req, path }) =>
      req.t('validation.enum', {
        field: req.t('attributes.' + path),
        values: Object.values(ProjectRole).join(', ')
      })
    )
    .trim()
];

module.exports = AddProjectMemberValidator;