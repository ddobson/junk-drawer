const bodyParser = require('body-parser');
const express = require('express');
const http = require('http');
const morgan = require('morgan');
const path = require('path');

const api = require('./server/routes/api');

const app = express();

// MIDDLEWARE
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

app.use(morgan('combined'));

app.use(express.static(path.join(__dirname, '../build')));

app.use('/api', api);

// ROUTING

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../build/index.html'));
});

// Server Setup

const port = process.env.PORT || 3001;
app.set('port', port);

const server = http.createServer(app);

server.listen(port, () => {
  console.log(`App started. Listening on port: ${port}`);
});
