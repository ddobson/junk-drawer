const clientOrigin = {
  development: 'http://localhost:3000',
  production: 'https://junk-drawer-app.herokuapp.com',
};

module.exports = clientOrigin[process.env.NODE_ENV];
