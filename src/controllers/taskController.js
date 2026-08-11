const { validationResult } = require("express-validator");
const taskService = require("../services/TaskService");
const { request } = require("express");

const index = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const skip = (page - 1) * limit;

    const { projects, totalCount } = await taskService.findMany({
      skip,
      limit,
      selectFields: ["id", "name", "key", "description", "icon", "status", "startDate", "endDate"],
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
    const project = await taskService.findById(projectId)
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
    const task = await taskService.store(req.body);
    return res.status(201).json({
      success: true,
      message: "درخواست با موفقیت انجام شد.",
      data: {
        taskservice,
      },
    });

  } catch (error) {
    return next(error)
  }
};


module.exports = {
  store,
  index,
  show,
};
