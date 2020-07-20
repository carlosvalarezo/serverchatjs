const amqp = require('amqplib/callback_api');

const receive = queue => {
  return new Promise((resolve, reject) => {
    amqp.connect('amqp://guest:guest@localhost', (error0, connection) => {
        connection.createChannel( (error1, channel) => {
            channel.assertQueue(queue, {
              durable: true
            });
            channel.consume(queue, msg => {
                resolve(JSON.parse(msg.content));
            },{
                noAck: true
            });

        });
    });
  });
}



module.exports = {receive};
