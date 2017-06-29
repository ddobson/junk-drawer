import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect, withRouter } from 'react-router-dom';

import '../styles/App.scss';

const App = function(props) {
  const { isAuthenticated } = props.auth;
  const { pathname } = props.location;

  if (isAuthenticated) {
    return <Redirect to="/dashboard" from={pathname} />;
  }

  return (
    <div className="App">
      <h1>{`App Component ${props.auth.isAuthenticated ? 'Auth\'d' : 'Not Auth\'d'}`}</h1>
    </div>
  );
};

App.propTypes = {
  auth: PropTypes.shape({
    isAuthenticated: PropTypes.bool,
  }),
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }),
};

const mapStateToProps = state => (
  { auth: state.auth }
);

const AppWithRouter = withRouter(App);

export default connect(mapStateToProps)(AppWithRouter);
