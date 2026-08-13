const { validationResult, query } = require("express-validator");
const taskStatusService = require("../services/TaskStatusService");
const { request } = require("express");

const index = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const skip = (page - 1) * limit;
    const projectId = req.params.projectId;
    const { statuses, totalCount } = await taskStatusService.findMany({
      skip,
      limit,
      projectId
    });

    return res.status(200).json({
      success: true,
      message: "درخواست با موفقیت انجام شد.",
      data: statuses,
      meta: {
        total_items: totalCount,
        current_page: page,
        per_page: limit,
        total_pages: Math.ceil(totalCount / limit),
      },
    });
  } catch (error) {
    next(error)
  }
};

const show = async (req, res, next) => {
  statusId = parseInt(req.params.statusId);
  try {
    const status = await taskStatusService.findById(statusId);
    return res.status(200).json({
      success: true,
      message: "درخواست با موفقیت انجام شد.",
      data: status,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const store = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const formattedErrors = {};
    errors.array().forEach((err) => {
      if (!formattedErrors[err.path]) {
        formattedErrors[err.path] = err.msg;
      }
    });
    return res.status(422).json({
      success: false,
      message: "درخواست شما با خطا مواجه شد.",
      errors: formattedErrors,
    });
  }

  try {
    const input = req.body;
    input.projectId = req.params.projectId;
    const status = await taskStatusService.store(input);

    return res.status(201).json({
      success: true,
      message: "درخواست با موفقیت انجام شد.",
      data: status,
    });
  } catch (error) {
    next(error);
  }
};

const update = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const formattedErrors = {};
    errors.array().forEach((err) => {
      if (!formattedErrors[err.path]) {
        formattedErrors[err.path] = err.msg;
      }
    });
    return res.status(422).json({
      success: false,
      message: "درخواست شما با خطا مواجه شد.",
      errors: formattedErrors,
    });
  }

  try {
    statusId = req.params.statusId;
    status = await taskStatusService.update(statusId, req.body);

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
};

const destroy = async (req, res, next) => {
  statusId = req.params.statusId;

  try {
    await taskStatusService.destroy(statusId);

    return res.status(200).json({
      success: true,
      message: "درخواست با موفقیت انجام شد.",
    });
  } catch (error) {
    next(error)
  }
};

module.exports = {
  store,
  index,
  show,
  update,
  destroy,
};
