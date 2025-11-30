const { z } = require('zod');

const fundingStageEnum = z.enum([
  'Pre-seed',
  'Seed',
  'Series A',
  'Series B+',
  'Bootstrapped'
]);

const productStageEnum = z.enum([
  'Idea',
  'Prototype',
  'MVP',
  'Launched',
  'Scaling'
]);

const predictionSchema = z.object({
  team_size: z.number().int().min(1).max(1000),
  funding_stage: fundingStageEnum,
  market_size: z.number().min(1),
  product_stage: productStageEnum,
  has_tech_cofounder: z.boolean().optional().default(true),
  runway_months: z.number().min(0).max(60).optional().default(12),
  industry_sector: z.string().min(1).optional().default('General'),
  revenue_run_rate: z.number().min(0).optional(),
  burn_rate: z.number().min(0).optional()
});

module.exports = { predictionSchema };
