const express = require('express');
const passport = require('passport');
const passportService = require('../services/passport');
const links = require('../controllers/links');

const router = express.Router();

passport.use(passportService.jwtLogin);

const requireAuth = passport.authenticate('jwt', { session: false });

router.get('/', (req, res) => {
  res.send('API Works!');
});

router.post('/links', requireAuth, links.create);
router.get('/links', requireAuth, links.index);
router.delete('/links/:id', requireAuth, links.destroy);
router.put('/links/:id', requireAuth, links.update);

module.exports = router;
