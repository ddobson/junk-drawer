const axios = require('axios');

function createCustomLink(data) {
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

module.exports = {
  createCustomLink
};

// Create a custom branded link

// Take an object with params

// Call rebrandly API

// Return data