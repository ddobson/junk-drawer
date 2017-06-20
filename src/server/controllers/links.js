const parser = require('url-parse');
const Link = require('../models/link');
const rebrandly = require('../services/rebrandly');

function _extractOriginalHost(destination) {
  const parsedURL = parser(destination);

  return `${parsedURL.protocol}//${parsedURL.hostname}`;
}

function _parseResponseData(resData, user) {
  const data = {
    originalHost: _extractOriginalHost(resData.destination),
    rebrandlyId: resData.id,
    destination: resData.destination,
    slashtag: resData.slashtag,
    shortUrl: `http://${resData.shortUrl}`,
    title: resData.title,
    userId: user._id,
  };

  return data;
}

function _createAndSaveLink(data) {
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

function create(req, res, next) {
  const responseData = rebrandly.createRebrandlyLink(req.body);

  responseData
    .then(response => response.data)
    .then(resData => _parseResponseData(resData, req.user))
    .then(parsedData => _createAndSaveLink(parsedData))
    .then(link => res.json(link))
    .catch((err) => {
      if (err.response) {
        const { status, data } = err.response;
        res.status(status).json({ error: data.message });
      }

      next(err);
    });
}

function index(req, res, next) {
  Link.find({ userId: req.user._id }).exec((err, links) => {
    if (err) { next(err); }
    res.json({ links });
  });
}

module.exports = {
  create,
  index,
  _extractOriginalHost,
  _parseResponseData,
  _createAndSaveLink,
};
