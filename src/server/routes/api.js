const express = require('express');
const links = require('../controllers/links');

const router = express.Router();

router.get('/', (req, res) => {
  res.send('API Works!');
});

router.post('/create-link', links.createCustomLink);

module.exports = router;
