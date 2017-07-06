import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';

import Button from '../ui/Button';
import FormField from '../ui/FormField';

const NewLinkForm = function(props) {
  const { handleSubmit, linksMeta } = props;

  return (
    <div className="columns">
      <div className="column">
        <form onSumit={handleSubmit}>
          <Field
            id="destination-field"
            name="destination"
            component={FormField}
            label="URL"
            type="text"
            required
          />
          <Field
            id="title-field"
            name="title"
            component={FormField}
            label="Title"
            type="text"
            required
          />
          <Field
            id="slashtag-field"
            name="slashtag"
            component={FormField}
            label="Slashtag"
            type="text"
            required
          />
          <div className="field">
            <div className="control">
              <Button type="submit" isPrimary isLoading={linksMeta.isLoading}>
                Create
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

NewLinkForm.propTypes = {
  handleSubmit: PropTypes.func,
  linksMeta: PropTypes.shape({
    isLoading: PropTypes.bool,
  }),
};

export default reduxForm({ form: 'newlink' })(NewLinkForm);
