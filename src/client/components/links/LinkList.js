import React, { Component } from 'react';
import PropTypes from 'prop-types';
import map from 'lodash/map';
import filter from 'lodash/filter';

import LinkListItem from './LinkListItem';
import SearchInput from '../ui/SearchInput';
import PageControl from '../ui/PageControl';
import Button from '../ui/Button';

import '../../styles/components/LinkList.scss';

class LinkList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchTerm: '',
      currentPage: 1,
      linksPerPage: 10,
      pageBeforeSearch: 1,
    };

    this.setNextPage = this.setNextPage.bind(this);
    this.setPreviousPage = this.setPreviousPage.bind(this);
    this.setSearchKeyword = this.setSearchKeyword.bind(this);
    this.searchLinks = this.searchLinks.bind(this);
    this.updateCurrentPage = this.updateCurrentPage.bind(this);
  }

  setNextPage() {
    this.setState({ currentPage: this.state.currentPage + 1 });
  }

  setPreviousPage() {
    this.setState({ currentPage: this.state.currentPage - 1 });
  }

  // TODO This method uses a hack to get pagination working. Consider refactor.
  setSearchKeyword(keyword) {
    const { currentPage, searchTerm, pageBeforeSearch } = this.state;

    if (keyword && !searchTerm) {
      // When this is the first input to search
      this.setState({
        searchTerm: keyword,
        currentPage: 1,
        pageBeforeSearch: currentPage,
      });
    } else if (keyword) {
      // When an existing search is being built upon
      this.setState({ searchTerm: keyword });
    } else {
      // When all search input is removed
      this.setState({ searchTerm: keyword, currentPage: pageBeforeSearch });
    }
  }

  searchLinks() {
    const regex = new RegExp(this.state.searchTerm, 'gi');
    return filter(
      this.props.links,
      link =>
        link.originalHost.match(regex) ||
        link.slashtag.match(regex) ||
        link.title.match(regex)
    );
  }

  updateCurrentPage(totalPages, totalPageLinks) {
    if (totalPages > 1 && totalPageLinks === 1) {
      this.setPreviousPage();
    }
  }

  render() {
    const { linksPerPage, currentPage } = this.state;
    const { destroyLink, toggleNewLinkModal, isModalOpen } = this.props;
    const lastIndex = linksPerPage * currentPage;
    const firstIndex = lastIndex - linksPerPage;
    const links = this.searchLinks();
    const totalPages = Math.ceil(links.length / linksPerPage);
    const paginatedLinks = links.slice(firstIndex, lastIndex);

    const renderLinkListItems = () =>
      map(paginatedLinks, link =>
        <LinkListItem
          key={link._id}
          link={link}
          updateCurrentPage={() =>
            this.updateCurrentPage(totalPages, paginatedLinks.length)}
          destroyLink={destroyLink}
        />
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
          <PageControl
            currentPage={currentPage}
            totalPages={totalPages}
            setNextPage={this.setNextPage}
            setPreviousPage={this.setPreviousPage}
          />
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
