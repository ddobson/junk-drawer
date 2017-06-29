import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { CSSTransitionGroup } from 'react-transition-group';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import SignInForm from '../components/auth/SignInForm';
import SignUpForm from '../components/auth/SignUpForm';
import { validateSignIn, validateSignUp } from '../services/auth/validations';
import { signInUser, signUpUser, authError } from '../actions/auth';
import '../styles/Authentication.scss';

class Authentication extends Component {
  constructor(props) {
    super(props);

    this.renderErrorNotification = this.renderErrorNotification.bind(this);
    this.renderForm = this.renderForm.bind(this);
  }

  componentWillReceiveProps(nextprops) {
    const currentlyAuthenticated = this.props.auth.isAuthenticated;
    const willBeAuthenticated = nextprops.auth.isAuthenticated;
    const { push } = this.props.history;

    if (!currentlyAuthenticated && willBeAuthenticated) {
      push('/dashboard');
    }
  }

  renderErrorNotification() {
    if (this.props.auth.hasErrored) {
      return (
        <CSSTransitionGroup
          transitionName="fade"
          transitionAppear
          transitionAppearTimeout={500}
        >
          <div className="notification is-danger">
            <button className="delete" onClick={this.props.clearAuthErrors} />
            {this.props.auth.error}
          </div>
        </CSSTransitionGroup>
      );
    }

    return null;
  }

  renderForm() {
    const { pathname } = this.props.history.location;
    const { auth, onSignInSubmit, onSignUpSubmit, clearAuthErrors } = this.props;

    switch (pathname) {
      case '/signin':
        return (
          <SignInForm
            auth={auth}
            onSignInSubmit={onSignInSubmit}
            clearAuthErrors={clearAuthErrors}
          />
        );
      case '/signup':
        return (
          <SignUpForm
            auth={auth}
            onSignUpSubmit={onSignUpSubmit}
            clearAuthErrors={clearAuthErrors}
          />
        );
      default:
        return null;
    }
  }

  render() {
    return (
      <div>
        { this.renderErrorNotification() }
        { this.renderForm() }
      </div>
    );
  }
}

Authentication.propTypes = {
  clearAuthErrors: PropTypes.func,
  onSignInSubmit: PropTypes.func,
  onSignUpSubmit: PropTypes.func,
  auth: PropTypes.shape({
    error: PropTypes.string,
    hasErrored: PropTypes.bool,
    isAuthenticated: PropTypes.bool,
  }),
  history: PropTypes.shape({
    push: PropTypes.func,
    location: PropTypes.shape({
      pathname: PropTypes.string,
    }),
  }),
};

const mapStateToProps = state => (
  { auth: state.auth }
);

const mapDispatchToProps = dispatch => ({
  onSignInSubmit(values, hasErrored) {
    dispatch(authError({ hasErrored: false, error: '' }));
    validateSignIn(values);
    dispatch(signInUser(values, hasErrored));
  },
  onSignUpSubmit(values) {
    dispatch(authError({ hasErrored: false, error: '' }));
    validateSignUp(values);
    dispatch(signUpUser(values));
  },
  clearAuthErrors() {
    dispatch(authError({ hasErrored: false, error: '' }));
  },
});

const AuthenticationWithRouter = withRouter(Authentication);

export default connect(mapStateToProps, mapDispatchToProps)(AuthenticationWithRouter);
