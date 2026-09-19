class ApiError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    console.log(this)

    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = ApiError;