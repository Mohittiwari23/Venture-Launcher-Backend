const investorService = require('../services/investorService');
const { ApiError } = require('../utils/apiError');

const listInvestors = (req, res, next) => {
  try {
    const {
      stage,
      industry,
      location,
      investment_range_min,
      investment_range_max
    } = req.query;

    const filters = {};

    if (stage) filters.stage = String(stage);
    if (industry) filters.industry = String(industry);
    if (location) filters.location = String(location);

    if (investment_range_min !== undefined) {
      const min = Number(investment_range_min);
      if (Number.isNaN(min) || min < 0) {
        throw new ApiError(400, 'investment_range_min must be a non-negative number');
      }
      filters.investmentRangeMin = min;
    }

    if (investment_range_max !== undefined) {
      const max = Number(investment_range_max);
      if (Number.isNaN(max) || max < 0) {
        throw new ApiError(400, 'investment_range_max must be a non-negative number');
      }
      filters.investmentRangeMax = max;
    }

    const items = investorService.getInvestors(filters);
    res.status(200).json({
      total: items.length,
      items
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { listInvestors };
