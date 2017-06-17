const express = require('express');
const Authentication = require('../controllers/authentication');

const router = express.Router();

router.post('/signup', Authentication.signup);

module.exports = router;
