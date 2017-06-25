import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';

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
            <div className="field">
              <label htmlFor="email-field" className="label">Email</label>
              <Field
                id="email-field"
                name="email"
                className="input"
                component="input"
                type="text"
              />
            </div>
            <div className="field">
              <label htmlFor="pass-field" className="label">Password</label>
              <Field
                id="pass-field"
                name="password"
                className="input"
                component="input"
                type="password"
              />
            </div>
            <div className="field is-grouped">
              <div className="control">
                <button className="button" type="submit">Sign In</button>
              </div>
              <div className="control">
                <button className="button is-danger" type="submit" onClick={reset}>Cancel</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

SignInForm.propTypes = {
  handleSubmit: PropTypes.func,
  onSignInSubmit: PropTypes.func,
  reset: PropTypes.func,
};

export default reduxForm({ form: 'signin' })(SignInForm);
