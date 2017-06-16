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

function createCustomLink(data) {
  return new Promise((resolve, reject) => {
    const responseData = createLinkWithRebradly(data);

    responseData
      .then(response => response.data)
      .then(data => resolve(data))
      .catch(error => reject(error));
  });
}

module.exports = {
  createCustomLink
};
