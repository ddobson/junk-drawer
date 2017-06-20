/* eslint-disable no-console */

const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

exports.connectToDatabase = function() {
  let MONGO_CONNECTION;

  if (process.env.NODE_ENV === 'test') {
    MONGO_CONNECTION = process.env.MONGODB_TEST;
    mongoose.connect(MONGO_CONNECTION);
  } else {
    MONGO_CONNECTION = process.env.MONGODB;
    mongoose.connect(MONGO_CONNECTION);
  }

  const db = mongoose.connection;

  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', () => {
    console.log(`MongoDB connected at ${MONGO_CONNECTION}`);
  });
};
