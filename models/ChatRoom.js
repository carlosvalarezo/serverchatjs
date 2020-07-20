const mongoose = require('mongoose');

const ChatRoomSchema = new mongoose.Schema({
  name: {
    type: String,
  }
});

module.exports = ChatRoom = mongoose.model('chatroom', ChatRoomSchema);
