const amqp = require('amqplib/callback_api');

const send = async (queue, message) => {
  await amqp.connect('amqp://guest:guest@localhost', (error0, connection) => {
      connection.createChannel((error1, channel) => {
          channel.assertQueue(queue, {
            durable: true
          });
          channel.sendToQueue(queue, Buffer.from(JSON.stringify({time: Date.now(),message})), {persistent: true});
          channel.close();
      });
  });
}
module.exports = {send};
