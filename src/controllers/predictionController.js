const { predictionSchema } = require('../validation/predictionValidation');
const predictionService = require('../services/predictionService');
const { ApiError } = require('../utils/apiError');

const predict = (req, res, next) => {
  try {
    const parsed = predictionSchema.parse(req.body);
    const result = predictionService.predict(parsed);
    res.status(200).json(result);
  } catch (err) {
    if (err.name === 'ZodError') {
      const details = err.errors.map(e => ({
        path: e.path.join('.'),
        message: e.message
      }));
      return next(new ApiError(400, 'Invalid request body', details));
    }
    next(err);
  }
};

module.exports = { predict };
