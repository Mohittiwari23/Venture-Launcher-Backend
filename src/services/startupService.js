const startups = require('../data/startups.json');

const matchesText = (value, query) => {
  if (!query) return true;
  if (!value) return false;
  return value.toLowerCase().includes(query.toLowerCase());
};

const matchesRange = (range, min, max) => {
  if (!range || typeof range.min !== 'number' || typeof range.max !== 'number') {
    return false;
  }
  if (min !== undefined && range.max < min) return false;
  if (max !== undefined && range.min > max) return false;
  return true;
};

const getStartups = filters => {
  return startups.filter(s => {
    if (filters.stage && !matchesText(s.stage, filters.stage)) {
      return false;
    }

    if (filters.industrySector && !matchesText(s.industrySector, filters.industrySector)) {
      return false;
    }

    if (filters.location && !matchesText(s.location, filters.location)) {
      return false;
    }

    if (filters.milestone && !matchesText(s.milestone, filters.milestone)) {
      return false;
    }

    if (
      filters.fundingNeedsMin !== undefined ||
      filters.fundingNeedsMax !== undefined
    ) {
      if (
        !matchesRange(
          s.fundingNeeds,
          filters.fundingNeedsMin,
          filters.fundingNeedsMax
        )
      ) {
        return false;
      }
    }

    return true;
  });
};

module.exports = { getStartups };
