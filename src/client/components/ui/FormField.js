import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const FormField = function({
  id,
  input,
  label,
  required,
  type,
  meta: { touched, error },
}) {
  const inputStyle = classnames({
    input: true,
    'is-danger': touched && error,
  });

  return (
    <div className="field">
      <label htmlFor={id} className="label">
        {label}
        {required ? <span className="required"> *</span> : null}
      </label>
      <input {...input} id={id} className={inputStyle} type={type} />
      {touched &&
        error &&
        <p className="help is-danger">
          {error}
        </p>}
    </div>
  );
};

FormField.propTypes = {
  // Ignore the shape of props coming from redux-form
  meta: PropTypes.object, // eslint-disable-line
  input: PropTypes.object, // eslint-disable-line
  id: PropTypes.string,
  required: PropTypes.bool,
  type: PropTypes.string,
  label: PropTypes.string,
};

export default FormField;
