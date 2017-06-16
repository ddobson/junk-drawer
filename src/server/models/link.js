const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const linkSchema = new Schema({
  destination: {
    type: String,
    required: true,
  },
  rebrandlyId: {
    type: Number,
    required: true,
  },
  slashtag: {
    type: String,
    required: true,
  },
  shortUrl: {
    type: String,
    required: true,
  },
  title: {
    type: String,
  },
}, {
  timestamps: true,
});

const Link = mongoose.model('Link', linkSchema);

module.exports = Link;
