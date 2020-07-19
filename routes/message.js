const express = require('express');
const router = express.Router();
const auth = require('../lib/middleware/auth');

const MessageController = require('../controllers/Message');

router.post('/', auth, MessageController.insert);
router.get('/', auth, MessageController.get);
module.exports = router;
