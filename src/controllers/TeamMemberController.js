const { validationResult, query } = require("express-validator");
const teamService = require("../services/TeamService");
const { request } = require("express");
const { selectFields } = require("express-validator/lib/field-selection");

const index = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const skip = (page - 1) * limit;
    const teamId = req.params.teamId;
    const { members, totalCount } = await teamService.getTeamMembers({
      skip,
      limit,
      teamId
    });

    return res.status(200).json({
      success: true,
      message: "درخواست با موفقیت انجام شد.",
      data: members,
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
    teamId = req.params.teamId;
    await teamService.addTeamMember(teamId, req.body);

    return res.status(201).json({
      success: true,
      message: "درخواست با موفقیت انجام شد.",
      data: {},
    });
  } catch (error) {
    next(error);
  }
};

const destroy = async (req, res, next) => {
  memberId = req.params.memberId;

  try {
    await teamService.deleteTeamMemeber(memberId);

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
  destroy,
};
