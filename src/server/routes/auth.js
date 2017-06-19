const express = require('express');
const passport = require('passport');
const passportService = require('../services/passport');
const Authentication = require('../controllers/authentication');

const router = express.Router();

passport.use(passportService.localLogin);

const requireSignin = passport.authenticate('local', { session: false });

router.post('/signup', Authentication.signup);
router.post('/signin', requireSignin, Authentication.signin);

module.exports = router;
