const amqp = require('amqplib/callback_api');
const config = require('config');

const RABBITMQ_SERVER = process.env.DEPLOY
                        ? "amqp://guest:guest@rabbitmq"
                        : "amqp://guest:guest@localhost";

const send = (queue, message) => {
  amqp.connect(process.RABBITMQ_SERVER, (error0, connection) => {
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
