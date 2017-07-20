import React from 'react';
import PropTypes from 'prop-types';
import map from 'lodash/map';
import { CSSTransitionGroup } from 'react-transition-group';

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
        <CSSTransitionGroup
          transitionName="fade"
          transitionEnterTimeout={500}
          transitionLeaveTimeout={500}
        >
          {renderLinkListItems()}
        </CSSTransitionGroup>
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
