import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect, withRouter } from 'react-router-dom';

import '../styles/components/App.scss';

const App = props => {
  const { isAuthenticated } = props.auth;
  const { pathname } = props.location;

  if (isAuthenticated) {
    return <Redirect to="/dashboard" from={pathname} />;
  }

  return (
    <div className="App">
      <section className="hero is-primary">
        <div className="hero-body">
          <div className="container">
            <h1 className="title">Welcome to Junk Drawer</h1>
            <h2 className="subtitle">Bookmarks. But shorter.</h2>
          </div>
        </div>
      </section>
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

const mapStateToProps = state => ({ auth: state.auth });

const AppWithRouter = withRouter(App);

export default connect(mapStateToProps)(AppWithRouter);
