import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const ProtectedRoute = function({ component: Component, ...rest }) {
  const { isAuthenticated } = { ...rest };

  return (
    <Route
      {...rest}
      render={props => (
        isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: '/signin', state: { from: props.location } }} />
        )
      )}
    />
  );
};

ProtectedRoute.propTypes = {
  isAuthenticated: PropTypes.bool,
  location: PropTypes.object, // eslint-disable-line
  component: PropTypes.func,
};

const mapStateToProps = state => (
  { isAuthenticated: state.auth.isAuthenticated }
);

export default connect(mapStateToProps)(ProtectedRoute);
