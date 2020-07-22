const mongoose = require('mongoose');
const config = require('config');
const db = process.env.DEPLOY ? config.get('mongoREMOTE') : config.get('mongoLOCAL');

const connectDB = async () => {
  const options = { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true};
  try{
    let connection = null;
    while(connection === null){
      console.log(`mongodb should connect to ${db}`);
      connection = await mongoose.connect(db, options, err => {
          if(err){
            setTimeout(connectWithRetry, 1500);
          }
      });
    }
    console.log('mongodb connected...');
  }
  catch(err){
    console.log(err.message);
    process.exit(1);

  }
}

module.exports = connectDB;
