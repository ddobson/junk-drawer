const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const express = require('express');
const http = require('http');
const morgan = require('morgan');
const path = require('path');
const api = require('./server/routes/api');
const app = express();

dotenv.config();

// DATABASE
mongoose.connect(process.env.MONGODB);

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log(`MongoDB connected at ${process.env.MONGODB}`);
});

// MIDDLEWARE
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(morgan('combined'));
app.use('/api', api);
app.use(express.static(path.join(__dirname, '../build')));

// ROUTING
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../build/index.html'));
});

// SERVER
const port = process.env.PORT || 3001;
app.set('port', port);

const server = http.createServer(app);

server.listen(port, () => {
  console.log(`App started. Listening on port: ${port}`);
});
