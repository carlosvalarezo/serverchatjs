'use strict';
const express = require('express');
const router = express.Router();

const health = (req, res) => {
  res.status(200).send({status:'ok'});
};

module.exports = { health };
