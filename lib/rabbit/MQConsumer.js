const amqp = require('amqplib/callback_api');

amqp.connect('amqp://guest:guest@localhost', (error0, connection) => {
    connection.createChannel((error1, channel) => {
        channel.assertQueue('chat-chat-bot', {
          durable: true
        });
        channel.consume('chat-chat-bot', msg => {
          console.log(JSON.parse(msg.content));
            return JSON.parse(msg.content);
        },{
            noAck: false
        });
    });
  });
