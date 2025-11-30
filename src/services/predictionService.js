const fundingStageWeights = {
  'Pre-seed': 0.4,
  Seed: 0.55,
  'Series A': 0.7,
  'Series B+': 0.8,
  Bootstrapped: 0.6
};

const productStageWeights = {
  Idea: 0.3,
  Prototype: 0.5,
  MVP: 0.7,
  Launched: 0.85,
  Scaling: 0.9
};

const clamp01 = value => {
  if (value < 0) return 0;
  if (value > 1) return 1;
  return value;
};

const scoreTeamStrength = input => {
  const sizeScore = Math.min(input.team_size, 15) / 15;
  const techFactor = input.has_tech_cofounder ? 0.15 : 0;
  return clamp01(0.6 * sizeScore + techFactor);
};

const scoreMarketViability = input => {
  const normalizedMarket = Math.log10(Math.max(input.market_size, 1));
  const scaled = (normalizedMarket - 5) / 2;
  const bounded = clamp01((scaled + 1) / 2);
  return bounded;
};

const scoreFundingHealth = input => {
  const stageWeight = fundingStageWeights[input.funding_stage] || 0.5;
  const runwayMonths = input.runway_months || 0;
  const runwayFactor = Math.min(runwayMonths, 24) / 24;
  return clamp01(0.7 * stageWeight + 0.3 * runwayFactor);
};

const scoreInnovationIndex = input => {
  const productWeight = productStageWeights[input.product_stage] || 0.5;
  const sectorBoost = input.industry_sector === 'DeepTech' || input.industry_sector === 'AI'
    ? 0.1
    : 0;
  return clamp01(0.7 * productWeight + sectorBoost);
};

const predict = input => {
  const teamStrength = scoreTeamStrength(input);
  const marketViability = scoreMarketViability(input);
  const fundingHealth = scoreFundingHealth(input);
  const innovationIndex = scoreInnovationIndex(input);

  const successScore = clamp01(
    0.3 * teamStrength +
      0.3 * marketViability +
      0.25 * fundingHealth +
      0.15 * innovationIndex
  );

  const metrics = {
    team_strength: Number(teamStrength.toFixed(2)),
    market_viability: Number(marketViability.toFixed(2)),
    funding_health: Number(fundingHealth.toFixed(2)),
    innovation_index: Number(innovationIndex.toFixed(2))
  };

  const insights = [];

  if (metrics.team_strength < 0.6) {
    insights.push('Team depth is relatively low; consider strengthening core leadership or tech roles.');
  }

  if (metrics.market_viability < 0.6) {
    insights.push('Market size appears limited; refine positioning or explore adjacent segments.');
  }

  if (metrics.funding_health < 0.6) {
    insights.push('Funding runway looks tight; risk of capital constraints in the near term.');
  }

  if (metrics.innovation_index >= 0.75) {
    insights.push('Product and innovation profile is strong relative to stage.');
  }

  return {
    success_score: Number(successScore.toFixed(2)),
    metrics,
    insights,
    input_snapshot: input
  };
};

module.exports = { predict };
