import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';

import Button from '../ui/Button';
import FormField from '../ui/FormField';

const NewLinkForm = function(props) {
  const { handleSubmit, linksMeta, reset } = props;

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
          <div className="field is-grouped">
            <div className="control">
              <Button type="submit" isLoading={linksMeta.isLoading}>Submit</Button>
            </div>
            <div className="control">
              <Button isDanger type="button" onClick={reset}>Cancel</Button>
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
  reset: PropTypes.func,
};

export default reduxForm({ form: 'newlink' })(NewLinkForm);
