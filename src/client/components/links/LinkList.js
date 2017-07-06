import React from 'react';
import PropTypes from 'prop-types';
import map from 'lodash/map';

import LinkListItem from './LinkListItem';
import Button from '../ui/Button';

import '../../styles/components/LinkList.scss';

const LinkList = function(props) {
  const { links, toggleNewLinkModal, isModalOpen } = props;

  const renderLinkListItems = () =>
    map(links, link => <LinkListItem key={link._id} link={link} />);

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
  isModalOpen: PropTypes.bool,
  links: PropTypes.objectOf(PropTypes.object).isRequired,
  toggleNewLinkModal: PropTypes.func,
};

export default LinkList;
