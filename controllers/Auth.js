'use strict';

const Auth = require('../service/AuthService');

const auth = (req, res) => {  
  Auth.auth(req, res);
}

module.exports = auth;
