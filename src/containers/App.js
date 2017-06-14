import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../styles/App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>App Component</h1>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { user: state.user };
};

export default connect(mapStateToProps)(App);
