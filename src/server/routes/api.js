const express = require('express');
const rebrandly = require('../services/rebrandly');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('API Works!');
});

router.post('/create-link', (req, res, next) => {
  rebrandly.createCustomLink(req.body)
    .then(response => response.data)
    .then(data => res.json(data))
    .catch(err => next(err));
});

module.exports = router;
