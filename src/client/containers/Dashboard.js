import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { linksFetchData } from '../actions/links';

import LoadingSpinner from '../components/ui/LoadingSpinner';

class Dashboard extends Component {
  componentDidMount() {
    this.props.fetchLinks();
  }

  render() {
    const { isLoading } = this.props.linksMeta;

    if (isLoading) {
      return (
        <section className="section">
          <div className="container">
            <LoadingSpinner />
          </div>
        </section>
      );
    }

    return (
      <div>Dashboard</div>
    );
  }
}

Dashboard.propTypes = {
  fetchLinks: PropTypes.func,
  linksMeta: PropTypes.shape({
    isLoading: PropTypes.bool,
  }),
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
