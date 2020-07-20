'use strict';

const express = require('express');
const gravatar = require('gravatar');
const config = require('config');
const axios = require('axios');
const csv = require('csvtojson');
const Message = require('../models/Message');
const User = require('../models/User');

const insert = async (req, res) => {
  const {id} = req.user;
  const {message, chatroom, source} = req.body;
  try{
    let msg = await Message.findOne({owner:id});
    msg = new Message({owner:id, message, chatroom, source:'db'});
    await msg.save();

    if (message.search("/stock=") >= 0){
      const code = message.split("=")[1];
      const stooqResponse = await axios.get(`https://stooq.com/q/l/?s=${code}&f=sd2t2ohlcv&h&e=csv`);
      let stooq = {};
      console.log(stooqResponse.data);
      csv({output: "json"}).fromString(stooqResponse.data).then(row=>{
        console.log(row);
      });
    }


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
