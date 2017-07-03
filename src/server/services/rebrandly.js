const axios = require('axios');

const apikey = process.env.REBRANDLY_API_KEY;

function _formatUpdateReqData(data, user) {
  // Rebrandly API update action requires favorite & domain
  return {
    destination: data.destination,
    domain: {
      id: '30cc4b1e8085449ea2b5e6893f31fc20',
      fullName: 'junk-drawer.link',
    },
    favorite: false,
    slashtag: `${user.userName}-${data.slashtag}`,
    title: data.title,
  };
}

function createRebrandlyLink(data, user) {
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
}

function destroyRebrandlyLink(link) {
  return axios({
    method: 'delete',
    url: `https://api.rebrandly.com/v1/links/${link.rebrandlyId}`,
    headers: {
      apikey,
    },
  });
}

function updateRebrandlyLink(data, link, user) {
  const reqData = _formatUpdateReqData(data, user);

  return axios({
    method: 'post',
    url: `https://api.rebrandly.com/v1/links/${link.rebrandlyId}`,
    headers: {
      'Content-Type': 'application/json',
      apikey,
    },
    data: reqData,
  });
}

module.exports = {
  _formatUpdateReqData,
  createRebrandlyLink,
  destroyRebrandlyLink,
  updateRebrandlyLink,
};
