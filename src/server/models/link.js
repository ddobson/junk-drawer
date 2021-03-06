const mongoose = require('mongoose');
const urlRegex = require('../../shared/url-regex');

const Schema = mongoose.Schema;

const linkSchema = new Schema(
  {
    destination: {
      type: String,
      required: true,
    },
    rebrandlyId: {
      type: Number,
      required: true,
    },
    originalHost: {
      type: String,
      required: true,
      validate: {
        validator(url) {
          return urlRegex({ strict: true }).test(url);
        },
        message:
          '{VALUE}) is not a valid URL. URLs must be valid and include protocol.',
      },
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
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
);

const Link = mongoose.model('Link', linkSchema);

module.exports = Link;
