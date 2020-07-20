const amqp = require('amqplib/callback_api');

const send =  (queue, message) => {
  amqp.connect('amqp://guest:guest@localhost', (error0, connection) => {
      connection.createChannel((error1, channel) => {
          channel.assertQueue(queue, {
            durable: true
          });
          channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)), {persistent: false});
      });
  });
}
module.exports = {send};
