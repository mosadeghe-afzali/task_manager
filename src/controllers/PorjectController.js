const { validationResult } = require("express-validator");
const ProjectService = require('../services/ProjectService');
const create = (req, res) => {

  res.render('projects/create.ejs', {
    title: "ایجاد پروژه",
    errors: []

  });
}

const store = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.render('projects/create.ejs', {
      title: "ایجاد پروژه",
      errors: errors.array(),
      request: req.body
    })
  }

  const project = ProjectService.store(req.body)

  res.redirect('/');
}

module.exports = {
  create,
  store
}