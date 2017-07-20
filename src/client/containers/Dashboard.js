import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  linksFetchData,
  linksCreateLink,
  linksDestroyLink,
} from '../actions/links';

import LoadingSpinner from '../components/ui/LoadingSpinner';
import Modal from '../components/ui/Modal';
import NewLinkForm from '../components/links/NewLinkForm';
import LinkList from '../components/links/LinkList';
import Notification from '../components/ui/Notification';

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = { isModalOpen: false };

    this.toggleNewLinkModal = this.toggleNewLinkModal.bind(this);
    this.renderErrorMessages = this.renderErrorMessages.bind(this);
  }

  componentDidMount() {
    this.props.linksFetchData();
  }

  toggleNewLinkModal() {
    this.setState({ isModalOpen: !this.state.isModalOpen });
  }

  renderErrorMessages() {
    return this.props.linksMeta.errors.map(error => {
      const { property, message } = error;
      const err = property
        ? `${property.charAt(0).toUpperCase() + property.slice(1)}: ${message}`
        : message;
      return <Notification isDanger transitionName="fade" message={err} />;
    });
  }

  render() {
    const { links, linksMeta, linksCreateLink, linksDestroyLink } = this.props;
    const { isModalOpen } = this.state;

    if (linksMeta.isLoading) {
      return (
        <section className="section">
          <div className="container">
            <LoadingSpinner />
          </div>
        </section>
      );
    }

    return (
      <div>
        {linksMeta.hasErrored ? this.renderErrorMessages() : null}
        <section className="section">
          <div className="container">
            <LinkList
              links={links}
              toggleNewLinkModal={this.toggleNewLinkModal}
              isModalOpen={isModalOpen}
              destroyLink={linksDestroyLink}
            />
            <Modal
              component={NewLinkForm}
              isModalOpen={isModalOpen}
              createLink={linksCreateLink}
              linksMeta={linksMeta}
              modalTitle="New Link"
              toggleModal={this.toggleNewLinkModal}
            />
          </div>
        </section>
      </div>
    );
  }
}

Dashboard.propTypes = {
  linksCreateLink: PropTypes.func.isRequired,
  linksDestroyLink: PropTypes.func.isRequired,
  linksFetchData: PropTypes.func.isRequired,
  links: PropTypes.objectOf(PropTypes.object).isRequired,
  linksMeta: PropTypes.shape({
    isLoading: PropTypes.bool,
    hasErrored: PropTypes.bool,
    errors: PropTypes.array,
  }).isRequired,
};

const mapStateToProps = state => ({
  links: state.links,
  linksMeta: state.linksMeta,
});

const mapDispatchToProps = {
  linksFetchData,
  linksCreateLink,
  linksDestroyLink,
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
