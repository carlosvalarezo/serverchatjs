'use strict';

const express = require('express');
const gravatar = require('gravatar');
const config = require('config');
const axios = require('axios');
const csv = require('csvtojson');
const Message = require('../models/Message');
const User = require('../models/User');

const MQSender = require('../lib/rabbit/MQSender');
const MQConsumer = require('../lib/rabbit/MQConsumer');

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
        const {data} = stooqResponse;
      console.log(data);
      csv({output: "json"}).fromString(data).then(row=>{
        MQSender.send('hello', row);
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
    let msgs = await Message.find();
    return res.status(201).json({status:msgs});
  }
  catch(err){
    console.log(err);
    return res.status(500).json({status:err.message});
  }
};

const bot = async (req, res) => {
  try{
    await MQConsumer.receive('hello', (x) => {console.log(JSON.stringify(x.content.toString()))});
    return res.status(200).json({a:'a'});

  }
  catch(err){
    console.log(err);
    return res.status(500).json({status:err.message});
  }
};

module.exports = { insert, get, bot };
