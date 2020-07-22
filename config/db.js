const mongoose = require('mongoose');
const config = require('config');
const db = process.env.DEPLOY ? config.get('mongoREMOTE') : config.get('mongoLOCAL');

const connectDB = async () => {
  const options = { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true};
  try{

    const connectWithRetry = function() {
        return mongoose.connect(db, function(err) {
            if (err) {
                console.error('Failed to connect to mongo on startup - retrying in 1 sec', err);
                setTimeout(connectWithRetry, 1500);
            }
        });
    };
    connectWithRetry();
    console.log('mongodb connected...');
  }
  catch(err){
    console.log(err.message);
    process.exit(1);

  }
}

module.exports = connectDB;
