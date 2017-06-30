import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const Button = function(props) {
  const btnStyle = classnames({
    button: !props.delete,
    delete: props.delete,
    disabled: props.isDisabled,
    'is-danger': props.isDanger,
    'is-loading': props.isLoading,
    'is-primary': props.isPrimary,
  });

  return (
    <button type={props.type} className={btnStyle} onClick={props.onClick}>
      {props.children}
    </button>
  );
};

Button.propTypes = {
  children: React.PropTypes.node.isRequired,
  delete: PropTypes.bool,
  isDisabled: PropTypes.bool,
  isDanger: PropTypes.bool,
  isLoading: PropTypes.bool,
  isPrimary: PropTypes.bool,
  onClick: PropTypes.func,
  type: PropTypes.string,
};

export default Button;
