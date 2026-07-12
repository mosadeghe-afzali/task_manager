const { validationResult } = require("express-validator");
const projectService = require("../services/ProjectService");
const teamService = require("../services/TeamService");
const { request } = require("express");

const index = async (req, res) => {
  const projects = await projectService.findMany({
    limit: 2,
    selectFields: ["id", "name"],
  });
  console.log(projects);

  res.render("projects/index.ejs", {
    title: "xx",
  });
};

const store = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.render("projects/create.ejs", {
      title: "ایجاد پروژه",
      errors: errors.array(),
      request: req.body,
    });
  }

  try {
    const project = projectService.store(req.body);
    return res.status(201).json({
      success: true,
      message: "درخواست با موفقیت انجام شد.",
      data: {
        project,
      },
    });
    
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  create,
  store,
  index,
};
