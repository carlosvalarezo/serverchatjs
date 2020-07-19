'use strict';

const Login = require('../service/LoginService');

const login = (req, res) => {
  Login.login(req, res);
}

module.exports = login;
