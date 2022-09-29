const AppError = require("../utils/appError");

const handleCastErrorDB = (err) => {
  const message = `Invalid ${err.path}: ${err.value}`;
  return new AppError(message, 400);
};

const handleDuplicateFieldsDB = (err) => {
  const value = err.keyValue.name;
  const message = `Dublicate field value: ${value} Please use another value.`;
  return new AppError(message, 400);
};

const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

const handleValidationErrorDB = (err) => {
  const message = "Invalid input data.";
  return new AppError(message, 400);
};

const sendErrorProduction = (err, res) => {
  // Operational, trusted error: send message to client
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
    // Programming or other unknown error: don't leak error detail
  } else {
    //1) Log error
    console.error("ERROR 💥", err);

    //2) send generic message
    res.status(500).json({
      status: "error",
      message: "Something went very wrong.",
    });
  }
};

module.exports = (err, req, res, next) => {
  // console.log(err.stack);
  console.log(err);
  err.statusCode = err.statusCode || 500; // 500 internal server error
  err.status = err.status || "error";
  if (process.env.NODE_ENV === "development") {
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV === "production") {
    let error = { ...err };
    // error not working in my case
    // if (error.name === "CastError") {
    //   error = handleCastErrorDB(error);
    // }
    if (error.code === 11000) error = handleDuplicateFieldsDB(error);
    if (error._message === "validation failed")
      error = handleValidationErrorDB(error);
    sendErrorProduction(error, res);
  }
};
