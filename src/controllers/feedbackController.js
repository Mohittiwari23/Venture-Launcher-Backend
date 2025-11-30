const { feedbackSchema } = require('../validation/feedbackValidation');
const { ApiError } = require('../utils/apiError');

const submitFeedback = (req, res, next) => {
  try {
    const parsed = feedbackSchema.parse(req.body);
    const response = {
      status: 'ok',
      received: {
        email: parsed.email || null,
        rating: parsed.rating || null
      }
    };
    res.status(201).json(response);
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

module.exports = { submitFeedback };
