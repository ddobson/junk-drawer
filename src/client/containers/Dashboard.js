import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { linksFetchData } from '../actions/links';

class Dashboard extends Component {
  componentDidMount() {
    this.props.fetchLinks();
  }

  render() {
    return (
      <div>Dashboard</div>
    );
  }
}

Dashboard.propTypes = {
  fetchLinks: PropTypes.func,
};

const mapStateToProps = state => (
  {
    links: state.links,
    linksMeta: state.linksMeta,
  }
);

const mapDispatchToProps = {
  fetchLinks: linksFetchData,
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
