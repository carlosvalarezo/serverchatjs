'use strict';

const User = require('../service/UserService');

const register = (req, res) => {
  User.register(req, res);
}

module.exports = register;
