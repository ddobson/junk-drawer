const jwt = require('jwt-simple');
const User = require('../models/user');

function tokenForUser(user) {
  const secret = process.env.SECRET;
  const timestamp = new Date().getTime();

  return jwt.encode({ sub: user.id, iat: timestamp }, secret);
}

exports.signup = function (req, res, next) {
  const email = req.body.email;
  const password = req.body.password;
  const passwordConf = req.body.passwordConf;

  if (!email || !password || !passwordConf) {
    res.status(422).json({ error: 'You must provide an email, password and password confirmation.' });
  }

  if (password !== passwordConf) {
    res.status(422).json({ error: 'The password and password confirmation do not match.' });
  }

  User.findOne({ email }, (err, existingUser) => {
    if (err) return next(err);

    if (existingUser) {
      return res.status(422).json({ error: 'Email is already in user' });
    }

    const newUser = new User({ email: email, password: password }); // eslint-disable-line object-shorthand,max-len

    newUser.save(newUser, (err) => {
      if (err) return next(err);

      return res.status(201).json({ token: tokenForUser(newUser), user: newUser });
    });
  });
};

exports.signin = function(req, res) {
  res.send({ token: tokenForUser(req.user) });
};
