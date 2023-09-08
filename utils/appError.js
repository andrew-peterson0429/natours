class AppError extends Error {
  constructor(message, statusCode) {
    super(message); // By doing the parent obj call, we set the message of the incoming message

    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
    // unexpected errors might happen in our app, but will not have isOperational, so that is why we add it. Ex: a programming err or a bug in package.
    this.isOperational = true; // This is so we can test with the property and send errors back for operational errors

    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = AppError;
