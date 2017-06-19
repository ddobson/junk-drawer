/* eslint-disable no-console */

const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

exports.connectToDatabase = function() {
  const ENV = process.env.NODE_ENV;
  let MONGO_CONNECTION;

  if (ENV === 'test') {
    MONGO_CONNECTION = process.env.MONGODB_TEST;
    mongoose.connect(MONGO_CONNECTION);
  }

  if (ENV === 'development') {
    MONGO_CONNECTION = process.env.MONGODB_DEVELOPMENT;
    mongoose.connect(MONGO_CONNECTION);
  }

  const db = mongoose.connection;

  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', () => {
    console.log(`MongoDB connected at ${MONGO_CONNECTION}`);
  });
};
