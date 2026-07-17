const ApiError = require('../helpers/ApiError');

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || 'خطایی در سمت سرور رخ داده است.';

  if (err.code === 'P2025') {
    err = new ApiError('رکورد مورد نظر یافت نشد.', 404);
  }

  if (err.code === 'P2002') {
    err = new ApiError('یک رکورد با این مشخصات یکتا از قبل وجود دارد.', 422);
  }

  if (err.name === 'JsonWebTokenError') {
    err = new ApiError('توکن نامعتبر است. مجدداً وارد شوید.', 401);
  }
  if (err.name === 'TokenExpiredError') {
    err = new ApiError('نشست شما منقضی شده است. مجدداً وارد شوید.', 401);
  }

  return res.status(err.statusCode).json({
    success: false,
    message: err.message,
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });
};