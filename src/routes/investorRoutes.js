const express = require('express');
const investorController = require('../controllers/investorController');

const router = express.Router();

router.get('/', investorController.listInvestors);

module.exports = router;
