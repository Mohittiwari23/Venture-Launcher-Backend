const { z } = require('zod');

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const feedbackSchema = z.object({
  email: z.string().trim().regex(emailRegex, 'Invalid email address').optional(),
  comment: z.string().trim().min(5).max(2000),
  rating: z.number().int().min(1).max(5).optional()
});

module.exports = { feedbackSchema };
