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
      if (err) { reject(err); }
      resolve(link);
    });
  });
}

function create(req, res, next) {
  const responseData = rebrandly.createRebrandlyLink(req.body, req.user);

  responseData
    .then(response => response.data)
    .then(resData => _parseResponseData(resData, req.user))
    .then(parsedData => _createAndSaveLink(parsedData))
    .then(link => res.json(link))
    .catch((err) => {
      if (err) {
        const { status, data } = err.response;
        res.status(status).json({ error: data.message });
      }

      next(err);
    });
}

function index(req, res, next) {
  Link.find({ userId: req.user._id }, (err, links) => {
    if (err) { next(err); }
    res.json({ links });
  });
}

function destroy(req, res, next) {
  const { id } = req.params;

  Link.findById(id)
    .then(link => rebrandly.destroyRebrandlyLink(link))
    .then(() => Link.findByIdAndRemove(id))
    .then(() => res.sendStatus(204))
    .catch(err => next(err));
}

module.exports = {
  create,
  index,
  destroy,
  _extractOriginalHost,
  _parseResponseData,
  _createAndSaveLink,
};
