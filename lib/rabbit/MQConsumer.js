const amqp = require('amqplib/callback_api');

const receive = async (queue, fn) => {
  amqp.connect('amqp://guest:guest@localhost', (error0, connection) => {
      connection.createChannel((error1, channel) => {
          channel.consume(queue, msg => {
              fn(msg);
          },{
              noAck: false
          });

      });
  });
}


module.exports = {receive};
