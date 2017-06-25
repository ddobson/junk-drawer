import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import SignInForm from '../components/SignInForm';
import '../styles/Authentication.scss';

class Authentication extends Component {
  static onSignInSubmit(values) {
    console.log(values);
  }

  constructor(props) {
    super(props);

    this.renderForm = this.renderForm.bind(this);
  }

  renderForm() {
    const { pathname } = this.props.history.location;

    switch (pathname) {
      case '/signin':
        return <SignInForm onSignInSubmit={Authentication.onSignInSubmit} />;
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
  history: PropTypes.shape({
    location: PropTypes.shape({
      pathname: PropTypes.string,
    }),
  }),
};

const mapStateToProps = state => (
  { auth: state.auth }
);

const AuthenticationWithRouter = withRouter(Authentication);

export default connect(mapStateToProps)(AuthenticationWithRouter);
