const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI');

const connectDB = async () => {
  const options = { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true};
  try{
    await mongoose.connect(db, options);
    console.log('mongodb connected...');
  }
  catch(err){
    console.log(err.message);
    process.exit(1);

  }
}

module.exports = connectDB;
