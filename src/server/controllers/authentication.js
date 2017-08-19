const jwt = require('jwt-simple');
const User = require('../models/user');

function _tokenForUser(user) {
  const secret = process.env.SECRET;
  const timestamp = new Date().getTime();

  return jwt.encode({ sub: user.id, iat: timestamp }, secret);
}

function signup(req, res, next) {
  const { email, userName, password, passwordConf } = req.body;

  if (!email || !password || !passwordConf || !userName) {
    res.status(400).json({
      error:
        'You must provide an email, username, password and password confirmation.',
    });
  }

  if (password !== passwordConf) {
    res
      .status(422)
      .json({ error: 'The password and password confirmation do not match.' });
  }

  if (password.length < 8) {
    res.status(422).json({ error: 'Password must be 8 or more characters.' });
  }

  User.findOne({ $or: [{ email }, { userName }] }, (err, existingUser) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    if (existingUser) {
      if (existingUser.email === email) {
        return res.status(422).json({ error: 'Email is already in use' });
      }

      return res.status(422).json({ error: 'Username is already in use' });
    }

    const newUser = new User({
      email,
      password,
      userName,
    });

    newUser.save(newUser, err => {
      if (err) return next(err);

      return res
        .status(201)
        .json({ token: _tokenForUser(newUser), user: newUser });
    });
  });
}

function signin(req, res) {
  res.json({ token: _tokenForUser(req.user) });
}

function changePassword(req, res) {
  const { password, newPassword } = req.body;

  if (!password || !newPassword) {
    return res
      .status(400)
      .json({ error: 'You must provide both the current and new passwords.' });
  }

  if (newPassword.length < 8) {
    return res
      .status(422)
      .json({ error: 'New password must be 8 or more characters.' });
  }

  User.findById(req.user._id, (err, user) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    user.comparePassword(password, (err, isMatch) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      if (!isMatch) {
        return res.status(401).json({ error: 'Invalid password.' });
      }

      user.password = newPassword; // eslint-disable-line no-param-reassign
      user.save();

      res.sendStatus(204);
    });
  });
}

module.exports = {
  signup,
  signin,
  changePassword,
  _tokenForUser,
};
