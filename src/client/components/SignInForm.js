import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';

const SignInForm = props => (
  <div className="columns">
    <div className="column is-offset-one-quarter is-half-tablet">
      <form onSubmit={props.handleSubmit}>
        <div className="field">
          <label htmlFor="email">Email</label>
          <Field id="email" name="email" className="input" component="input" type="text" />
        </div>
        <div className="field">
          <label htmlFor="email">Email</label>
          <Field id="email" name="email" className="input" component="input" type="text" />
        </div>
        <div className="field">
          <button className="button" type="submit">Sign In</button>
        </div>
      </form>
    </div>
  </div>
);

SignInForm.propTypes = {
  handleSubmit: PropTypes.function,
};

export default reduxForm({ form: 'signin' })(SignInForm);
