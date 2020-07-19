'use strict';
const express = require('express');
const router = express.Router();

const auth = (req, res) => {
  console.log("en auth service...", req.body);
  console.log("en auth service...", req.user);
  return res.status(200).json({status:'allowed'});
};

module.exports = { auth };
