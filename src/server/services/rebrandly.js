const axios = require('axios');
const Link = require('../models/link');

function createLinkWithRebradly(data) {
  return axios({
    method: 'post',
    url: 'https://api.rebrandly.com/v1/links',
    headers: {
      'Content-Type': 'application/json',
      apikey: process.env.REBRANDLY_API_KEY,
    },
    data,
  });
}

function parseResponseData(resData) {
  const data = {
    rebrandlyId: resData.id,
    destination: resData.destination,
    slashtag: resData.slashtag,
    shortUrl: resData.shortUrl,
    title: resData.title,
  };

  return data;
}

function createAndSaveLink(data) {
  return new Promise((resolve, reject) => {
    const link = new Link(data);

    link.save((err) => {
      if (err) {
        console.error(err); // eslint-disable-line no-console
        reject(err);
      }

      resolve(link);
    });
  });
}

function createCustomLink(data) {
  return new Promise((resolve, reject) => {
    const responseData = createLinkWithRebradly(data);

    responseData
      .then(response => response.data)
      .then(resData => parseResponseData(resData))
      .then(parsedData => createAndSaveLink(parsedData))
      .then(link => resolve(link))
      .catch(error => reject(error));
  });
}

module.exports = {
  createCustomLink,
};
