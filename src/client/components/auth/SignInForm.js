import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';

import Button from '../ui/Button';
import FormField from '../ui/FormField';

const SignInForm = function(props) {
  const { auth, handleSubmit, reset } = props;

  return (
    <section className="section">
      <div className="container is-fluid">
        <div className="cta-container">
          <h1 className="title">Sign In</h1>
          <span>
            {'Don\'t have an account? '}
            <Link to="/signup">Sign up!</Link>
          </span>
        </div>
      </div>
      <div className="columns">
        <div className="column is-offset-one-quarter is-half-tablet">
          <form onSubmit={handleSubmit(values => props.onSignInSubmit(values, auth.hasErrored))}>
            <Field
              id="email-field"
              name="email"
              component={FormField}
              type="text"
              label="Email"
              required
            />
            <Field
              id="pass-field"
              name="password"
              component={FormField}
              type="password"
              label="Password"
              required
            />
            <div className="field is-grouped">
              <div className="control">
                <Button type="submit" isLoading={auth.isLoading}>Sign In</Button>
              </div>
              <div className="control">
                <Button isDanger type="button" onClick={reset}>Cancel</Button>
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
  auth: PropTypes.shape({
    isAuthenticated: PropTypes.bool,
  }),
};

export default reduxForm({ form: 'signin' })(SignInForm);
