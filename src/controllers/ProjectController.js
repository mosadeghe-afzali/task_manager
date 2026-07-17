const { validationResult } = require("express-validator");
const projectService = require("../services/ProjectService");
const teamService = require("../services/TeamService");
const { request } = require("express");

const index = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const skip = (page - 1) * limit;

    const { projects, totalCount } = await projectService.findMany({
      skip,
      limit,
      selectFields: ["id", "name", "key", "startDate", "endDate"],
    });

    return res.status(200).json({
      success: true,
      message: "درخواست با موفقیت انجام شد.",
      data: projects,
      meta: {
        total_items: totalCount,
        current_page: page,
        per_page: limit,
        total_pages: Math.ceil(totalCount / limit)
      }
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const show = async (req, res, next) => {
  projectId = parseInt(req.params.projectId);
  try {
    const project = await projectService.findById(projectId)
    return res.status(200).json({
      success: true,
      message: "درخواست با موفقیت انجام شد.",
      data: project
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

const store = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {

    const formattedErrors = {};
    errors.array().forEach(err => {
      if (!formattedErrors[err.path]) {
        formattedErrors[err.path] = err.msg;
      }
    });
    return res.status(422).json({
      success: false,
      message: "درخواست شما با خطا مواجه شد.",
      errors: formattedErrors
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


const update = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {

    const formattedErrors = {};
    errors.array().forEach(err => {
      if (!formattedErrors[err.path]) {
        formattedErrors[err.path] = err.msg;
      }
    });
    return res.status(422).json({
      success: false,
      message: "درخواست شما با خطا مواجه شد.",
      errors: formattedErrors
    });
  }

  try {
    projectId = req.params.projectId;
    project = projectService.update(projectId, req.body);

    return res.status(200).json({
      success: true,
      message: "درخواست با موفقیت انجام شد.",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

const destroy = async (req, res) => {
  projectId = req.params.projectId;

  try {
    projectService.destroy(projectId);

    return res.status(200).json({
      success: true,
      message: "درخواست با موفقیت انجام شد.",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

module.exports = {
  store,
  index,
  show,
  update,
  destroy
};
