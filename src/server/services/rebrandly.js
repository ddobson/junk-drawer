const axios = require('axios');

const apikey = process.env.REBRANDLY_API_KEY;

exports.createRebrandlyLink = function(data, user) {
  data.slashtag = `${user.userName}-${data.slashtag}`; // eslint-disable-line no-param-reassign

  return axios({
    method: 'post',
    url: 'https://api.rebrandly.com/v1/links',
    headers: {
      'Content-Type': 'application/json',
      apikey,
    },
    data,
  });
};

exports.destroyRebrandlyLink = function(link) {
  return axios({
    method: 'delete',
    url: `https://api.rebrandly.com/v1/links/${link.rebrandlyId}`,
    headers: {
      apikey,
    },
  });
};

exports.updateRebrandlyLink = function(data, link) {
  return axios({
    method: 'post',
    url: `https://api.rebrandly.com/v1/links/${link.rebrandlyId}`,
    headers: {
      'Content-Type': 'application/json',
      apikey,
    },
    data,
  });
};
