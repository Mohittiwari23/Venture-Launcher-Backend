const express = require('express');
const startupController = require('../controllers/startupController');

const router = express.Router();

router.get('/', startupController.listStartups);

module.exports = router;
