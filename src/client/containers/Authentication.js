import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import SignInForm from '../components/SignInForm';
import validateSignIn from '../services/auth/validations';
import { signInUser } from '../actions/auth';
import '../styles/Authentication.scss';

class Authentication extends Component {
  constructor(props) {
    super(props);

    this.renderForm = this.renderForm.bind(this);
  }

  componentWillReceiveProps(nextprops) {
    const currentlyAuthenticated = this.props.auth.isAuthenticated;
    const willBeAuthenticated = nextprops.auth.isAuthenticated;
    const { push } = this.props.history;

    if (!currentlyAuthenticated && willBeAuthenticated) {
      push('/');
    }
  }

  renderForm() {
    const { pathname } = this.props.history.location;

    switch (pathname) {
      case '/signin':
        return <SignInForm onSignInSubmit={this.props.onSignInSubmit} />;
      default:
        return null;
    }
  }

  render() {
    return (
      <div>
        { this.renderForm() }
      </div>
    );
  }
}

Authentication.propTypes = {
  onSignInSubmit: PropTypes.func,
  auth: PropTypes.shape({
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
  onSignInSubmit(values) {
    validateSignIn(values);
    dispatch(signInUser(values));
  },
});

const AuthenticationWithRouter = withRouter(Authentication);

export default connect(mapStateToProps, mapDispatchToProps)(AuthenticationWithRouter);
