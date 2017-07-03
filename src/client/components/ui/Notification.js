import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { CSSTransitionGroup } from 'react-transition-group';

import Button from './Button';

const Notification = props => {
  const notificationStyle = classnames({
    notification: true,
    'is-danger': props.isDanger,
    'is-info': props.isInfo,
    'is-primary': props.isPrimary,
    'is-success': props.isSuccess,
    'is-warning': props.isWarning,
  });

  return (
    <CSSTransitionGroup
      transitionName={props.transitionName}
      transitionAppear
      transitionAppearTimeout={500}
    >
      <div className={notificationStyle}>
        <Button delete onClick={props.onDeleteClick} />
        {props.message}
      </div>
    </CSSTransitionGroup>
  );
};

Notification.propTypes = {
  isDanger: PropTypes.bool,
  isInfo: PropTypes.bool,
  isPrimary: PropTypes.bool,
  isSuccess: PropTypes.bool,
  isWarning: PropTypes.bool,
  message: PropTypes.string,
  onDeleteClick: PropTypes.func,
  transitionName: PropTypes.string,
};

export default Notification;
