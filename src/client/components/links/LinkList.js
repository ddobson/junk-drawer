import React from 'react';
import PropTypes from 'prop-types';
import map from 'lodash/map';

import LinkListItem from './LinkListItem';
import Button from '../ui/Button';

import '../../styles/components/LinkList.scss';

const LinkList = function({ links }) {
  const renderLinkListItems = () =>
    map(links, link => <LinkListItem key={link._id} link={link} />);

  return (
    <div className="columns">
      <div className="column">
        <div className="link-header">
          <h1 className="title">Links</h1>
          <Button isPrimary>New Link</Button>
        </div>
        {renderLinkListItems()}
      </div>
    </div>
  );
};

LinkList.propTypes = {
  links: PropTypes.objectOf(PropTypes.object).isRequired,
};

export default LinkList;
