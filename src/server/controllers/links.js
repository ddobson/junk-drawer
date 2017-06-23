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

function _handleLinkErrors(err, res) {
  if (err.response) {
    const error = err.response.data;

    if (err.response.status === 403) {
      return res.status(422).json({ error });
    }

    if (err.response.status === 404) {
      return res.status(404).json({ error });
    }

    return res.status(500).json({ error });
  }

  return res.status(500).json({ error: err.message });
}

function index(req, res) {
  Link.find({ userId: req.user._id }, (err, links) => {
    if (err) { _handleLinkErrors(err, res); }

    res.json({ links });
  });
}

function create(req, res) {
  const responseData = rebrandly.createRebrandlyLink(req.body, req.user);

  responseData
    .then(response => response.data)
    .then(resData => _parseResponseData(resData, req.user))
    .then(parsedData => _createAndSaveLink(parsedData))
    .then(link => res.status(201).json(link))
    .catch(err => _handleLinkErrors(err, res));
}

function destroy(req, res) {
  const { id } = req.params;

  Link.findById(id)
    .then(link => rebrandly.destroyRebrandlyLink(link))
    .then(() => Link.findByIdAndRemove(id))
    .then(() => res.sendStatus(204))
    .catch(err => _handleLinkErrors(err, res));
}

function update(req, res) {
  const { id } = req.params;

  Link.findById(id)
    .then(link => rebrandly.updateRebrandlyLink(req.body, link, req.user))
    .then(response => response.data)
    .then(resData => _parseResponseData(resData, req.user))
    .then(parsedData => _updateAndSaveLink(id, parsedData))
    .then(link => res.json(link))
    .catch(err => _handleLinkErrors(err, res));
}

module.exports = {
  index,
  create,
  destroy,
  update,
  _extractOriginalHost,
  _parseResponseData,
  _createAndSaveLink,
  _handleLinkErrors,
};
