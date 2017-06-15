const mongoose = require('mongoose');
const schema = mongoose.Schema;

const link = new Schema({
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
  timestamps: true,
  title: {
    type: String,
  },
});

const Link = new mongoose.model('Link', link);

module.exports = Link;
