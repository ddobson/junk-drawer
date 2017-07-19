import urlRegex from 'url-regex';

function validate(values) {
  const { destination, title, slashtag } = values;
  const slashtagRegex = new RegExp(/^[a-zA-Z0-9][a-zA-Z0-9_-]+$/, 'g');
  const errors = {};

  if (!destination) {
    errors.destination = 'URL is required.';
  } else if (!urlRegex({ strict: true }).test(destination)) {
    errors.destination =
      'You must use a valid URL. "http(s)://" should be included.';
  } else if (destination.length > 1000) {
    errors.destination = `URL has a max limit of 1000 characters. Used: ${values
      .destination.lngth} / 1000`;
  }

  if (!title) {
    errors.title = 'Title is required.';
  } else if (title.length < 3 || title.length > 255) {
    errors.title = `Titles must be 3 - 255 characters. Used: ${title.length} / 255`;
  }

  if (!slashtag) {
    errors.slashtag = 'Slashtag is required.';
  } else if (!slashtagRegex.test(slashtag)) {
    errors.slashtag =
      'Slashtags may only contain alphanumeric characters, hyphens and underscores.';
  } else if (slashtag.length > 40) {
    errors.slashtag = `Slashtags must be 1 - 40 characters. Used: ${title.length} / 40`;
  }
  return errors;
}

export default validate;
