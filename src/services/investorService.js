const investors = require('../data/investors.json');

const matchesText = (value, query) => {
  if (!query) return true;
  if (!value) return false;
  return value.toLowerCase().includes(query.toLowerCase());
};

const matchesArray = (values, query) => {
  if (!query) return true;
  if (!Array.isArray(values)) return false;
  const lower = query.toLowerCase();
  return values.some(v => String(v).toLowerCase().includes(lower));
};

const matchesRange = (range, min, max) => {
  if (!range || typeof range.min !== 'number' || typeof range.max !== 'number') {
    return false;
  }
  if (min !== undefined && range.max < min) return false;
  if (max !== undefined && range.min > max) return false;
  return true;
};

const getInvestors = filters => {
  return investors.filter(inv => {
    if (filters.stage) {
      const stageMatch =
        matchesArray(inv.preferredStartupStages, filters.stage) ||
        matchesText(inv.stageLabel, filters.stage);
      if (!stageMatch) return false;
    }

    if (filters.industry) {
      const industryMatch =
        matchesArray(inv.focusIndustries, filters.industry) ||
        matchesText(inv.focusSector, filters.industry);
      if (!industryMatch) return false;
    }

    if (filters.location && !matchesText(inv.location, filters.location)) {
      return false;
    }

    if (
      filters.investmentRangeMin !== undefined ||
      filters.investmentRangeMax !== undefined
    ) {
      if (!matchesRange(inv.investmentRange, filters.investmentRangeMin, filters.investmentRangeMax)) {
        return false;
      }
    }

    return true;
  });
};

module.exports = { getInvestors };
