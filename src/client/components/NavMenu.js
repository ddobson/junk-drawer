import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const NavMenu = (props) => {
  if (props.isAuthenticated) {
    return (
      <div>
        <div className="nav-right nav-menu">
          <Link className="nav-item is-tab" to="/" onClick={props.signOut}>Sign Out</Link>
        </div>
      </div>
    );
  }

  return null;
};

NavMenu.propTypes = {
  signOut: PropTypes.func,
  isAuthenticated: PropTypes.bool,
};

export default NavMenu;
