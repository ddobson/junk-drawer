const express = require('express');
const passport = require('passport');
const passportService = require('../services/passport');
const Authentication = require('../controllers/authentication');

const router = express.Router();

passport.use(passportService.localLogin);
passport.use(passportService.jwtLogin);

const requireSignin = passport.authenticate('local', { session: false });
const requireAuth = passport.authenticate('jwt', { session: false });

router.post('/signup', Authentication.signup);
router.post('/signin', requireSignin, Authentication.signin);
router.put('/changepw', requireAuth, Authentication.changePassword);

module.exports = router;
