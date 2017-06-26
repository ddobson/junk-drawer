import React from 'react';
import PropTypes from 'prop-types';

const FormField = ({ id, input, label, type, meta: { touched, error } }) => (
  <div className="field">
    <label htmlFor={id} className="label">
      {label}
      <span className="required"> *</span>
    </label>
    <input {...input} id={id} className={error ? 'input is-danger' : 'input'} type={type} />
    {touched && error && <p className="help is-danger">{error}</p>}
  </div>
);

FormField.propTypes = {
  // Ignore the shape of props coming from redux-form
  meta: PropTypes.object, // eslint-disable-line
  input: PropTypes.object, // eslint-disable-line
  id: PropTypes.string,
  type: PropTypes.string,
  label: PropTypes.string,
};

export default FormField;
