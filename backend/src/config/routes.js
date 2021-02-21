const express = require('express');
const PeriodController = require('../controllers/PeriodController');

const router = express.Router();

router.get('/periods', PeriodController.view);

module.exports = router;
