import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const Button = function(props) {
  const btnStyle = classnames({
    button: !props.delete,
    delete: props.delete,
    'is-danger': props.isDanger,
    'is-loading': props.isLoading,
    'is-outlined': props.isOutlined,
    'is-primary': props.isPrimary,
  });

  return (
    <button
      type={props.type}
      className={btnStyle}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
};

Button.propTypes = {
  children: React.PropTypes.node.isRequired,
  delete: PropTypes.bool,
  disabled: PropTypes.bool,
  isDanger: PropTypes.bool,
  isLoading: PropTypes.bool,
  isOutlined: PropTypes.bool,
  isPrimary: PropTypes.bool,
  onClick: PropTypes.func,
  type: PropTypes.string,
};

export default Button;
