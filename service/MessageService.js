'use strict';

const express = require('express');
const gravatar = require('gravatar');
const config = require('config');
const Message = require('../models/Message');
const User = require('../models/User');

const insert = async (req, res) => {
  const {id} = req.user;
  const {message, chatroom, source} = req.body;
  console.log({message, chatroom, source}, {id})
  try{
    let msg = await Message.findOne({owner:id});
    msg = new Message({owner:id, message, chatroom, source:'db'});
    await msg.save();

    return res.status(201).json({status:'message created'});
  }
  catch(err){
    console.log(err);
    return res.status(500).json({status:err.message});
  }
};

const get = async (req, res) => {
  try{
    let msg = await Message.find();
    return res.status(201).json({status:msg});
  }
  catch(err){
    console.log(err);
    return res.status(500).json({status:err.message});
  }
};

module.exports = { insert, get };
