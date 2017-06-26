import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';

const renderField = ({ input, label, id, type, meta: { touched, error } }) => (
  <div className="field">
    <label htmlFor={id} className="label">
      {label}
      <span className="required"> *</span>
    </label>
    <input {...input} id={id} className={error ? 'input is-danger' : 'input'} type={type} />
    {touched && error && <p className="help is-danger">{error}</p>}
  </div>
);

const SignInForm = function(props) {
  const { handleSubmit, reset } = props;

  return (
    <section className="section">
      <div className="container is-fluid">
        <h1 className="title">
          Sign In
        </h1>
      </div>
      <div className="columns">
        <div className="column is-offset-one-quarter is-half-tablet">
          <form onSubmit={handleSubmit(props.onSignInSubmit)}>
            <Field
              id="email-field"
              name="email"
              component={renderField}
              type="text"
              label="Email"
            />
            <Field
              id="pass-field"
              name="password"
              component={renderField}
              type="password"
              label="Password"
            />
            <div className="field is-grouped">
              <div className="control">
                <button className="button" type="submit">Sign In</button>
              </div>
              <div className="control">
                <button className="button is-danger" type="button" onClick={reset}>Cancel</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

renderField.propTypes = {
  // Ignore the shape of props coming from redux-form
  meta: PropTypes.object, // eslint-disable-line
  input: PropTypes.object, // eslint-disable-line
  id: PropTypes.string,
  type: PropTypes.string,
  label: PropTypes.string,
};

SignInForm.propTypes = {
  handleSubmit: PropTypes.func,
  onSignInSubmit: PropTypes.func,
  reset: PropTypes.func,
};

export default reduxForm({ form: 'signin' })(SignInForm);
