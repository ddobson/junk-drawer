const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const express = require('express');
const http = require('http');
const morgan = require('morgan');
const path = require('path');
const database = require('./server/config/database');
const api = require('./server/routes/api');
const auth = require('./server/routes/auth');

const app = express();

dotenv.config();

// DATABASE
database.connectToDatabase();

// MIDDLEWARE
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('combined'));
app.use('/api', api);
app.use('/auth', auth);
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
