import React, { Component } from 'react';
import PropTypes from 'prop-types';
import map from 'lodash/map';
import filter from 'lodash/filter';
import keyBy from 'lodash/keyBy';

import LinkListItem from './LinkListItem';
import SearchInput from '../ui/SearchInput';
import Button from '../ui/Button';

import '../../styles/components/LinkList.scss';

class LinkList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchTerm: '',
    };

    this.setSearchKeyword = this.setSearchKeyword.bind(this);
    this.searchLinks = this.searchLinks.bind(this);
  }

  setSearchKeyword(keyword) {
    this.setState({ searchTerm: keyword });
  }

  searchLinks() {
    const regex = new RegExp(this.state.searchTerm, 'gi');
    return keyBy(
      filter(
        this.props.links,
        link =>
          link.originalHost.match(regex) ||
          link.slashtag.match(regex) ||
          link.title.match(regex)
      ),
      '_id'
    );
  }

  render() {
    const { destroyLink, toggleNewLinkModal, isModalOpen } = this.props;
    const links = this.searchLinks();

    const renderLinkListItems = () =>
      map(links, link =>
        <LinkListItem key={link._id} link={link} destroyLink={destroyLink} />
      );

    return (
      <div className="columns is-centered">
        <div className="column is-three-quarters-desktop">
          <div className="link-header">
            <h1 className="title">Links</h1>
            <Button
              isPrimary
              isOutlined
              disabled={isModalOpen}
              onClick={toggleNewLinkModal}
            >
              New Link
            </Button>
          </div>
          <SearchInput setSearchKeyword={this.setSearchKeyword} />
          <div className="link-items">
            {renderLinkListItems()}
          </div>
        </div>
      </div>
    );
  }
}

LinkList.propTypes = {
  destroyLink: PropTypes.func.isRequired,
  isModalOpen: PropTypes.bool,
  links: PropTypes.objectOf(PropTypes.object).isRequired,
  toggleNewLinkModal: PropTypes.func,
};

export default LinkList;
