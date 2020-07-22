'use strict';

const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const User = require('../models/User');

const login = async (req, res) => {
  const {email} = req.body;
  let {password} = req.body;
  try{
    password = await bcrypt.hash(password, config.get('salt'));
    const user = await User.find({email, password});
    console.log({user});
    if(user.length <= 0){
      return res.status(403).send({status:'wrong credentials!'});
    }

    const payload = {
      user:{
        id: user.id
      }
    }

    jwt.sign(payload, config.get('jwtSecret'), {expiresIn:360000}, (err, token) => {
      if(err) throw err;
      return res.status(201).send({status:'user logged', token});
    });
  }
  catch(err){
    console.log(err.message);
    return res.status(500).send({status:err.message});
  }

};

module.exports = { login };
