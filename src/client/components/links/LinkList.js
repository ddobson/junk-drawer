import React from 'react';
import PropTypes from 'prop-types';
import map from 'lodash/map';

import LinkListItem from './LinkListItem';
import Button from '../ui/Button';

import '../../styles/components/LinkList.scss';

const LinkList = function(props) {
  const { destroyLink, links, toggleNewLinkModal, isModalOpen } = props;

  const renderLinkListItems = () =>
    map(links, link =>
      <LinkListItem key={link._id} link={link} destroyLink={destroyLink} />
    );

  return (
    <div className="columns">
      <div className="column">
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
        {renderLinkListItems()}
      </div>
    </div>
  );
};

LinkList.propTypes = {
  destroyLink: PropTypes.func.isRequired,
  isModalOpen: PropTypes.bool,
  links: PropTypes.objectOf(PropTypes.object).isRequired,
  toggleNewLinkModal: PropTypes.func,
};

export default LinkList;
