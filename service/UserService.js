'use strict';

const express = require('express');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const config = require('config');
const User = require('../models/User');

const register = async (req, res) => {
  const {name, email, password} = req.body;
  try{
    let user = await User.findOne({email});
    if(user){
      return res.status(409).send({status:'user already exists'});
    }
    const avatar = gravatar.url(email, {
      s:'200', r:'pg', d: 'mm'
    });

    user = new User({name, email, password, avatar});
    user.password = await bcrypt.hash(password, config.get('salt'));

    await user.save();
    return res.status(201).send({status:'user created'});
  }
  catch(err){
    return res.status(500).send({status:err.message});
  }

};

module.exports = { register };
