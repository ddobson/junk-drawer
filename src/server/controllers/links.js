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
    const newLink = new Link(data);

    newLink.save((err, link) => {
      if (err) { reject(err); }
      resolve(link);
    });
  });
}

function _updateAndSaveLink(id, data) {
  return new Promise((resolve, reject) => {
    Link.findByIdAndUpdate(id, data, (err, link) => {
      if (err) { reject(err); }
      resolve(link);
    });
  });
}

function create(req, res) {
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

function update(req, res) {
  const { id } = req.params;

  Link.findById(id)
    .then(link => rebrandly.updateRebrandlyLink(req.body, link, req.user))
    .then(response => response.data)
    .then(resData => _parseResponseData(resData, req.user))
    .then(parsedData => _updateAndSaveLink(id, parsedData))
    .then(link => res.json(link))
    .catch((err) => {
      if (err.response) {
        const { status, data } = err.response;
        res.status(status).json({ error: data.message });
      }
    });
}

module.exports = {
  create,
  index,
  destroy,
  update,
  _extractOriginalHost,
  _parseResponseData,
  _createAndSaveLink,
};
