import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import '../styles/App.scss';

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>App Component</h1>
      </div>
    );
  }
}

App.propTypes = {
  auth: PropTypes.shape({
    isAuthenticated: PropTypes.bool,
  }),
};

const mapStateToProps = state => (
  { auth: state.auth }
);

export default connect(mapStateToProps)(App);
