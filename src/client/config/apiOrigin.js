const apiOrigin = {
  development: 'http://localhost:3001',
  production: 'https://junk-drawer-app.herokuapp.com',
};

export default apiOrigin[process.env.NODE_ENV];
