const { validationResult } = require("express-validator");
const teamService = require("../services/TeamService");
const userService = require("../services/UserService");

const index = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const skip = (page - 1) * limit;
    const { teams, totalCount } = await teamService.index(skip, limit);

    return res.status(200).json({
      success: true,
      message: "درخواست با موفقیت انجام شد.",
      data: teams,
      meta: {
        total_items: totalCount,
        current_page: page,
        per_page: limit,
        total_pages: Math.ceil(totalCount / limit),
      },
    });
  } catch (error) {
    next(error);
  }
};
const show = async (req, res, next) => {
  teamId = parseInt(req.params.teamId);
  try {
    const team = await teamService.findById(teamId);
    return res.status(200).json({
      success: true,
      message: "درخواست با موفقیت انجام شد.",
      data: team,
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
    input["projectId"] = req.params.projectId;
    const team = await teamService.store(input);
    return res.status(201).json({
      success: true,
      message: "درخواست با موفقیت انجام شد.",
      data: {
        team,
      },
    });
  } catch (error) {
    next(error);
  }
};

const update = async (req, res) => {};

const destroy = async (req, res) => {
  teamId = req.params.teamId;

  try {
    await teamService.destroy(teamId);

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

module.exports = {
  index,
  store,
  show,
  update,
  destroy,
};
