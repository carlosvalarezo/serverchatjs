const express = require('express');
const router = express.Router();

const UserController = require('../controllers/User');

router.post('/', UserController);

module.exports = router;
