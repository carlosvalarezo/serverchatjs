'use strict';

const Health = require('../service/HealthService');

const health = (req, res) => {
  Health.health(req, res);
}

module.exports = health ;
