import React, { Component } from 'react';
import PropTypes from 'prop-types';
import map from 'lodash/map';
import { connect } from 'react-redux';
import { linksFetchData } from '../actions/links';

import LoadingSpinner from '../components/ui/LoadingSpinner';
import LinkListItem from '../components/links/LinkListItem';

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.renderLinkListItems = this.renderLinkListItems.bind(this);
  }
  componentDidMount() {
    this.props.fetchLinks();
  }

  renderLinkListItems() {
    const { links } = this.props;

    return map(links, link => <LinkListItem key={link._id} link={link} />);
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
          <div className="columns">
            <div className="column">
              <h1 className="title">Links</h1>
              {this.renderLinkListItems()}
            </div>
          </div>
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
