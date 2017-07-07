import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';

import Button from '../ui/Button';
import FormField from '../ui/FormField';

const NewLinkForm = function(props) {
  const { createLink, handleSubmit, linksMeta, toggleModal } = props;

  return (
    <div className="columns">
      <div className="column">
        <form
          onSubmit={handleSubmit(values => {
            toggleModal();
            createLink(values);
          })}
        >
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
  createLink: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  linksMeta: PropTypes.shape({
    isLoading: PropTypes.bool,
  }).isRequired,
  toggleModal: PropTypes.func.isRequired,
};

export default reduxForm({ form: 'newlink' })(NewLinkForm);
