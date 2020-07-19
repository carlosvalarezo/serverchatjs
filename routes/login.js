const express = require('express');
const router = express.Router();

const LoginController = require('../controllers/Login');

router.post('/', LoginController);

module.exports = router;
