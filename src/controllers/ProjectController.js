const { validationResult } = require("express-validator");
const projectService = require('../services/ProjectService');
const teamService = require('../services/TeamService');
const { request } = require("express");

const index = async (req, res) => {
  const projects = await projectService.findMany({ limit: 2, selectFields: ['id', 'name'] });
  console.log(projects)

  res.render('projects/index.ejs', {
    title: "xx"
  })
}


const create = async (req, res) => {
  const teams = await teamService.findMany();
  const icons = [
    { name: "folder", label: "عمومی" },
    { name: "shopping-cart", label: "فروشگاه" },
    { name: "users", label: "تیم" },
    { name: "code", label: "توسعه" },
    { name: "database", label: "دیتابیس" },
  ];
  res.render('projects/create.ejs', {
    title: "ایجاد پروژه",
    errors: [],
    teams: teams,
    request: req.body,
    icons: icons

  });
}

const store = async (req, res, next) => {
  const errors = validationResult(req);
  const teams = await teamService.findMany();
  const icons = [
    { name: "folder", label: "عمومی" },
    { name: "shopping-cart", label: "فروشگاه" },
    { name: "users", label: "تیم" },
    { name: "code", label: "توسعه" },
    { name: "database", label: "دیتابیس" },
  ];
  if (!errors.isEmpty()) {
    return res.render('projects/create.ejs', {
      title: "ایجاد پروژه",
      errors: errors.array(),
      request: req.body,
      icons: icons
    })
  }

  const project = projectService.store(req.body)

  res.redirect('/');
}

module.exports = {
  create,
  store,
  index
}