const startupService = require('../services/startupService');
const { ApiError } = require('../utils/apiError');

const listStartups = (req, res, next) => {
  try {
    const {
      stage,
      industry_sector,
      location,
      funding_needs_min,
      funding_needs_max,
      milestone
    } = req.query;

    const filters = {};

    if (stage) filters.stage = String(stage);
    if (industry_sector) filters.industrySector = String(industry_sector);
    if (location) filters.location = String(location);
    if (milestone) filters.milestone = String(milestone);

    if (funding_needs_min !== undefined) {
      const min = Number(funding_needs_min);
      if (Number.isNaN(min) || min < 0) {
        throw new ApiError(400, 'funding_needs_min must be a non-negative number');
      }
      filters.fundingNeedsMin = min;
    }

    if (funding_needs_max !== undefined) {
      const max = Number(funding_needs_max);
      if (Number.isNaN(max) || max < 0) {
        throw new ApiError(400, 'funding_needs_max must be a non-negative number');
      }
      filters.fundingNeedsMax = max;
    }

    const items = startupService.getStartups(filters);
    res.status(200).json({
      total: items.length,
      items
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { listStartups };
