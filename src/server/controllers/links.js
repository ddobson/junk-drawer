const parser = require('url-parse');
const Link = require('../models/link');
const rebrandly = require('../services/rebrandly');

function extractOriginalHost(destination) {
  const parsedURL = parser(destination);

  return `${parsedURL.protocol}//${parsedURL.hostname}`;
}

function parseResponseData(resData) {
  const data = {
    originalHost: extractOriginalHost(resData.destination),
    rebrandlyId: resData.id,
    destination: resData.destination,
    slashtag: resData.slashtag,
    shortUrl: `http://${resData.shortUrl}`,
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

function handleLinkCreation(data) {
  return new Promise((resolve, reject) => {
    const responseData = rebrandly.createRebrandlyLink(data);

    responseData
      .then(response => response.data)
      .then(resData => parseResponseData(resData))
      .then(parsedData => createAndSaveLink(parsedData))
      .then(link => resolve(link))
      .catch(error => reject(error));
  });
}

function createCustomLink(req, res, next) {
  handleLinkCreation(req.body)
    .then(data => res.json(data))
    .catch((err) => {
      if (err.response) {
        const { status, data } = err.response;
        res.status(status).json({ error: data.message });
      }

      next(err);
    });
}

module.exports = {
  createCustomLink,
};
