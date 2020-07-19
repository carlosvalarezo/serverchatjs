const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
  source: {
    type: String,
  },
  time:{
    type: Date,
    default: Date.now
  },
  owner:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true
  },
  message: {
    type: String,
    required: true
  },
  chatroom:{
    type: String
  }
});

module.exports = Message = mongoose.model('message', MessageSchema);
