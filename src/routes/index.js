const express = require('express');
const predictionRoutes = require('./predictionRoutes');
const feedbackRoutes = require('./feedbackRoutes');
const investorRoutes = require('./investorRoutes');
const startupRoutes = require('./startupRoutes');

const router = express.Router();

router.use('/predict', predictionRoutes);
router.use('/feedback', feedbackRoutes);
router.use('/investors', investorRoutes);
router.use('/startups', startupRoutes);

module.exports = router;
