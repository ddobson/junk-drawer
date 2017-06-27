import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import '../styles/App.scss';

const App = props => (
  <div className="App">
    <h1>{`App Component ${props.auth.isAuthenticated ? 'Auth\'d' : 'Not Auth\'d'}`}</h1>
  </div>
);

App.propTypes = {
  auth: PropTypes.shape({
    isAuthenticated: PropTypes.bool,
  }),
};

const mapStateToProps = state => (
  { auth: state.auth }
);

export default connect(mapStateToProps)(App);
