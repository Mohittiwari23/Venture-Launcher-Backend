const { ApiError } = require('./apiError');

const notFoundHandler = (req, res, next) => {
  next(new ApiError(404, 'Route not found'));
};

const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const payload = {
    error: {
      message: err.message || 'Internal server error'
    }
  };

  if (err.details) {
    payload.error.details = err.details;
  }

  if (statusCode === 500) {
    console.error(err);
  }

  res.status(statusCode).json(payload);
};

module.exports = { notFoundHandler, errorHandler };
