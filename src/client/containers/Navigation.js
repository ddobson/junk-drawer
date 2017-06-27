import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { signOutUser } from '../actions/auth';
import NavMenu from '../components/NavMenu';

const Navigation = (props) => {
  const { isAuthenticated } = props.auth;
  const { signOut } = props;

  return (
    <nav className="nav has-shadow">
      <div className="nav-left">
        <div className="nav-item">
          <h3>Junk Drawer</h3>
        </div>
      </div>
      <NavMenu isAuthenticated={isAuthenticated} signOut={signOut} />
    </nav>
  );
};

Navigation.propTypes = {
  signOut: PropTypes.func,
  auth: PropTypes.shape({
    isAuthenticated: PropTypes.bool,
  }),
};

const mapStateToProps = state => (
  { auth: state.auth }
);

const mapDispatchToProps = dispatch => ({
  signOut() {
    dispatch(signOutUser());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);
