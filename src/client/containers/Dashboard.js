import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { linksFetchData } from '../actions/links';

import LoadingSpinner from '../components/ui/LoadingSpinner';
import Modal from '../components/ui/Modal';
import NewLinkForm from '../components/links/NewLinkForm';
import LinkList from '../components/links/LinkList';

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = { isModalOpen: false };

    this.toggleNewLinkModal = this.toggleNewLinkModal.bind(this);
  }

  componentDidMount() {
    this.props.linksFetchData();
  }

  toggleNewLinkModal() {
    this.setState({ isModalOpen: !this.state.isModalOpen });
  }

  render() {
    const { links, linksMeta } = this.props;
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
      <section className="section">
        <div className="container">
          <LinkList
            links={links}
            toggleNewLinkModal={this.toggleNewLinkModal}
            isModalOpen={isModalOpen}
          />
          <Modal
            component={NewLinkForm}
            isModalOpen={isModalOpen}
            linksMeta={linksMeta}
            modalTitle="New Link"
            toggleModal={this.toggleNewLinkModal}
          />
        </div>
      </section>
    );
  }
}

Dashboard.propTypes = {
  linksFetchData: PropTypes.func.isRequired,
  links: PropTypes.objectOf(PropTypes.object).isRequired,
  linksMeta: PropTypes.shape({
    isLoading: PropTypes.bool.isRequired,
  }),
};

const mapStateToProps = state => ({
  links: state.links,
  linksMeta: state.linksMeta,
});

const mapDispatchToProps = {
  linksFetchData,
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
