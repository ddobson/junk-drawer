const axios = require('axios');

function createLinkWithRebradly(data) {
  return axios({
    method: 'post',
    url: 'https://api.rebrandly.com/v1/links',
    headers: {
      "Content-Type": "application/json",
      "apikey": "d933be40ec934d7c90de9721e96dbae5"
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

function createCustomLink(data) {
  return new Promise((resolve, reject) => {
    const responseData = createLinkWithRebradly(data);

    responseData
      .then(response => response.data)
      .then(data => parseResponseData(data))
      .then(parsedData => resolve(parsedData))
      .catch(error => reject(error));
  });
}

module.exports = {
  createCustomLink
};
