import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import FormField from './FormField';

const SignInForm = function(props) {
  const { handleSubmit, reset, auth } = props;
  const btnStyle = auth.isLoading ? 'button is-loading' : 'button';

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
          <form onSubmit={handleSubmit(props.onSignInSubmit)}>
            <Field
              id="email-field"
              name="email"
              component={FormField}
              type="text"
              label="Email"
            />
            <Field
              id="pass-field"
              name="password"
              component={FormField}
              type="password"
              label="Password"
            />
            <div className="field is-grouped">
              <div className="control">
                <button className={btnStyle} type="submit">Sign In</button>
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

SignInForm.propTypes = {
  handleSubmit: PropTypes.func,
  onSignInSubmit: PropTypes.func,
  reset: PropTypes.func,
  auth: PropTypes.shape({
    isAuthenticated: PropTypes.bool,
  }),
};

export default reduxForm({ form: 'signin' })(SignInForm);
