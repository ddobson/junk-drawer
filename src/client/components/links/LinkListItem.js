import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import '../../styles/components/LinkListItem.scss';

class LinkListItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isCollapsed: true,
    };

    this.toggleCollapse = this.toggleCollapse.bind(this);
  }

  toggleCollapse() {
    this.setState({ isCollapsed: !this.state.isCollapsed });
  }

  render() {
    const { originalHost, shortUrl, title } = this.props.link;
    const wrapperStyles = classnames({
      'link-wrapper': true,
      collapsed: this.state.isCollapsed,
    });
    const iconAngleStyles = classnames({
      fa: true,
      'fa-angle-down': this.state.isCollapsed,
      'fa-angle-up': !this.state.isCollapsed,
    });

    return (
      <div className={wrapperStyles}>
        <div className="link-url">
          <img
            className="og-host-icon"
            src={`https://www.google.com/s2/favicons?domain=${originalHost}`}
            alt={`${originalHost} icon`}
          />
          <a href={shortUrl} target="_blank" rel="noopener noreferrer">
            {shortUrl}
          </a>
          <span
            className="icon"
            role="presentation"
            onClick={this.toggleCollapse}
          >
            <i className={iconAngleStyles} />
          </span>
          <span className="icon is-small">
            <i className="fa fa-trash-o" />
          </span>
          <span className="icon is-small">
            <i className="fa fa-copy" />
          </span>
        </div>
        <div className="link-info">
          <p>
            {title}
          </p>
        </div>
      </div>
    );
  }
}

LinkListItem.propTypes = {
  link: PropTypes.shape({
    originalHost: PropTypes.string,
    shortUrl: PropTypes.string,
    title: PropTypes.string,
  }),
};

export default LinkListItem;
