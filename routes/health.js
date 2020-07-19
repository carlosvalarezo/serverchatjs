const express = require('express');
const router = express.Router();

const HealthController = require('../controllers/Health');

router.get('/', HealthController);

module.exports = router;
