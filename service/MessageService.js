'use strict';

const express = require('express');
const gravatar = require('gravatar');
const config = require('config');
const axios = require('axios');
const csv = require('csvtojson');
const Message = require('../models/Message');
const UserService = require('../service/UserService');
const QueueSender = require('../lib/rabbit/QueueSender');

const insert = async (req, res) => {
  const {id} = req.user;
  const {message, chatroom, source} = req.body;
  try{
    const user = await UserService.getUserById(id);
    sendMongo(user, message, chatroom);
    const rabbitMessge = await sendRabbit(message);
    const bot = await UserService.getUserByName("Bot");
    sendMongo(bot[0].id, rabbitMessge, chatroom)
    return res.status(201).json({status:'message created'});
  }
  catch(err){
    console.log(err);
    return res.status(500).json({status:err.message});
  }
};

const get = async (req, res) => {
  try{
    const msgs = await Message.find().populate({path:'owner', select:'name avatar'});
    return res.status(201).json({status:msgs});
  }
  catch(err){
    console.log(err);
    return res.status(500).json({status:err.message});
  }
};

const sendRabbit = async message => {
  if (message.search("/stock=") >= 0){
    const code = message.split("=")[1];
    const stooqResponse = await axios.get(`https://stooq.com/q/l/?s=${code}&f=sd2t2ohlcv&h&e=csv`);
    const {data} = stooqResponse;
    return csv({output: "json"}).fromString(data).then( row=>{
      const message = `${row[0].Symbol} quote is \$${row[0].Close}`;
      QueueSender.send('chat-queue',{status:message});
      return new Promise(resolve => resolve(message));
    });
  }

}

const sendMongo = async (userId, message, chatroom) => {
  const msg = new Message({owner:userId, message, chatroom, source:'db'});
  const lateMessage = await msg.save();
  const {id} = lateMessage;
  const latestMessage = await Message.findById(id).populate({path:'owner', select:'name avatar'});
  QueueSender.send('mongo-queue', {status:latestMessage});
}

module.exports = { insert, get };
