const amqp = require('amqplib/callback_api');

const send = (queue, message) => {
  amqp.connect('amqp://guest:guest@localhost', (error0, connection) => {
      connection.createChannel((error1, channel) => {
          channel.assertQueue(queue, {
            durable: true
          });
          const messageSubmitted = JSON.stringify({time: Date.now(),message});
          channel.sendToQueue(queue, Buffer.from(messageSubmitted), {persistent: true});
          channel.close();
      });
  });
}
module.exports = {send};
