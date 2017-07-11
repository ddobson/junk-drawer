import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import clipboard from 'clipboard-js';

import '../../styles/components/LinkListItem.scss';

class LinkListItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isCollapsed: true,
      copyTooltipText: 'Copy to clipboard',
    };

    this.handleCopyClick = this.handleCopyClick.bind(this);
    this.handleDestroyClick = this.handleDestroyClick.bind(this);
    this.resetCopyTooltip = this.resetCopyTooltip.bind(this);
    this.toggleCollapse = this.toggleCollapse.bind(this);
  }

  handleCopyClick() {
    clipboard
      .copy(this.props.link.shortUrl)
      .then(() => this.setState({ copyTooltipText: 'Copied!' }));
  }

  resetCopyTooltip() {
    if (this.state.copyTooltipText !== 'Copy to clipboard') {
      this.setState({ copyTooltipText: 'Copy to clipboard' });
    }
  }

  handleDestroyClick() {
    this.props.destroyLink(this.props.link._id);
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
            onClick={this.toggleCollapse}
            role="presentation"
          >
            <i className={iconAngleStyles} />
          </span>
          <span
            className="icon is-small"
            onClick={this.handleDestroyClick}
            role="presentation"
          >
            <i className="fa fa-trash-o" />
          </span>
          <span
            aria-label={this.state.copyTooltipText}
            className="icon is-small tooltipped tooltipped-n"
            onClick={this.handleCopyClick}
            onMouseLeave={this.resetCopyTooltip}
            role="presentation"
          >
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
  destroyLink: PropTypes.func.isRequired,
  link: PropTypes.shape({
    _id: PropTypes.string,
    originalHost: PropTypes.string,
    shortUrl: PropTypes.string,
    title: PropTypes.string,
  }).isRequired,
};

export default LinkListItem;
