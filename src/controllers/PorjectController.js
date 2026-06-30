const { validationResult } = require("express-validator");
const projectService = require('../services/ProjectService');
const teamService = require('../services/TeamService');
const create = (req, res) => {

  res.render('projects/create.ejs', {
    title: "ایجاد پروژه",
    errors: []

  });
}

const store = (req, res, next) => {
  const errors = validationResult(req);
  const teams = teamService.findMany();

  if (!errors.isEmpty()) {
    return res.render('projects/create.ejs', {
      title: "ایجاد پروژه",
      errors: errors.array(),
      request: req.body
    })
  }

  const project = projectService.store(req.body)

  res.redirect('/');
}

module.exports = {
  create,
  store
}