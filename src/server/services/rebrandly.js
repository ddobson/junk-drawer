const axios = require('axios');

exports.createRebrandlyLink = function(data) {
  return axios({
    method: 'post',
    url: 'https://api.rebrandly.com/v1/links',
    headers: {
      'Content-Type': 'application/json',
      apikey: process.env.REBRANDLY_API_KEY,
    },
    data,
  });
};
