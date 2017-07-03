import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { CSSTransitionGroup } from 'react-transition-group';

import Button from '../ui/Button';
import FormField from '../ui/FormField';

class SignInForm extends Component {
  componentDidMount() {
    this.props.clearAuthErrors();
  }

  render() {
    const { handleSubmit, reset, auth, onSignUpSubmit } = this.props;

    return (
      <CSSTransitionGroup
        transitionName="fade"
        transitionAppear
        transitionAppearTimeout={500}
        transitionLeaveTimeout={300}
      >
        <section className="section">
          <div className="container is-fluid">
            <div className="cta-container">
              <h1 className="title">Sign Up</h1>
              <span>
                {'Already have an account? '}
                <Link to="/signin">Sign In!</Link>
              </span>
            </div>
          </div>
          <div className="columns">
            <div className="column is-offset-one-quarter is-half-tablet">
              <form
                onSubmit={handleSubmit(values =>
                  onSignUpSubmit(values, auth.hasErrored)
                )}
              >
                <Field
                  id="email-field"
                  name="email"
                  component={FormField}
                  type="text"
                  label="Email"
                  required
                />
                <Field
                  id="username-field"
                  name="userName"
                  component={FormField}
                  type="text"
                  label="Username"
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
                <Field
                  id="confirm-field"
                  name="passwordConf"
                  component={FormField}
                  type="password"
                  label="Password Confirmation"
                  required
                />
                <div className="field is-grouped">
                  <div className="control">
                    <Button type="submit" isLoading={auth.isLoading}>
                      Sign Up
                    </Button>
                  </div>
                  <div className="control">
                    <Button isDanger type="button" onClick={reset}>
                      Cancel
                    </Button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </section>
      </CSSTransitionGroup>
    );
  }
}

SignInForm.propTypes = {
  clearAuthErrors: PropTypes.func,
  handleSubmit: PropTypes.func,
  onSignUpSubmit: PropTypes.func,
  reset: PropTypes.func,
  auth: PropTypes.shape({
    isLoading: PropTypes.bool,
  }),
};

export default reduxForm({ form: 'signin' })(SignInForm);
