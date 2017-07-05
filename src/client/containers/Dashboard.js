import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { linksFetchData } from '../actions/links';

import LoadingSpinner from '../components/ui/LoadingSpinner';
import LinkList from '../components/links/LinkList';

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
      <section className="section">
        <div className="container">
          <LinkList links={this.props.links} />
        </div>
      </section>
    );
  }
}

Dashboard.propTypes = {
  fetchLinks: PropTypes.func,
  links: PropTypes.object, // eslint-disable-line
  linksMeta: PropTypes.shape({
    isLoading: PropTypes.bool,
  }),
};

const mapStateToProps = state => ({
  links: state.links,
  linksMeta: state.linksMeta,
});

const mapDispatchToProps = {
  fetchLinks: linksFetchData,
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
