# Venture Launcher Backend

Backend-only demo for the Venture Launcher Prediction Prototype landing page.

## Tech Stack

- Node.js
- Express
- Zod for validation
- In-memory static JSON data
- No database, no authentication

## Endpoints

- POST `/api/predict`
- POST `/api/feedback`
- GET `/api/investors`
- GET `/api/startups`

### Example: POST /api/predict

Request body:

```json
{
  "team_size": 8,
  "funding_stage": "Seed",
  "market_size": 5000000,
  "product_stage": "MVP",
  "has_tech_cofounder": true,
  "runway_months": 12,
  "industry_sector": "SaaS"
}
