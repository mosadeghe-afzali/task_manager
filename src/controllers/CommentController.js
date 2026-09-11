const { validationResult } = require("express-validator");
const commentService = require("../services/CommentService");

const index = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const projectId = req.params.projectId;
    console.log(projectId, ' p id')
    const { comments, totalCount } = await commentService.findMany({
      page,
      limit,
      projectId
    });

    return res.status(200).json({
      success: true,
      message: "درخواست با موفقیت انجام شد.",
      data: comments,
      meta: {
        total_items: totalCount,
        current_page: page,
        per_page: limit,
        total_pages: Math.ceil(totalCount / limit),
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const show = async (req, res, next) => {
  commentId = parseInt(req.params.commentId);
  try {
    const project = await commentService.findById(commentId);
    return res.status(200).json({
      success: true,
      message: "درخواست با موفقیت انجام شد.",
      data: project,
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
    const comment = await commentService.store(req.body);
    return res.status(201).json({
      success: true,
      message: "درخواست با موفقیت انجام شد.",
      data: {
        comment,
      },
    });
  } catch (error) {
    return next(error);
  }
};


const update = async (req, res, next) => {
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
    const commentId = parseInt(req.params.commentId);

    const comment = await commentService.update(commentId, req.body);
    return res.status(201).json({
      success: true,
      message: "درخواست با موفقیت انجام شد.",
      data: {
        comment,
      },
    });
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  store,
  index,
  show,
  update,
};
