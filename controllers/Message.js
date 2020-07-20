'use strict';

const Message = require('../service/MessageService');

const insert = (req, res) => {
  Message.insert(req, res);
}

const get = (req, res) => {
  Message.get(req, res);
}

module.exports = {insert, get};
