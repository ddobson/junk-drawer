import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import NavMenu from '../components/NavMenu';

class Navigation extends Component {
  render() {
    const { isAuthenticated } = this.props.auth;

    return (
      <nav className="nav has-shadow">
        <div className="nav-left">
          <div className="nav-item">
            <h3>Junk Drawer</h3>
          </div>
        </div>
        <NavMenu isAuthenticated={isAuthenticated} />
      </nav>
    );
  }
}

Navigation.propTypes = {
  auth: PropTypes.shape({
    isAuthenticated: PropTypes.bool,
  }),
};

const mapStateToProps = state => (
  { auth: state.auth }
);

export default connect(mapStateToProps)(Navigation);
