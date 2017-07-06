import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import '../../styles/components/Modal.scss';

const Modal = function({
  component: Component,
  isModalOpen,
  modalTitle,
  toggleModal,
  ...rest
}) {
  const modalStyles = classnames({
    modal: true,
    'is-active': isModalOpen,
  });

  return (
    <div className={modalStyles}>
      <div
        className="modal-background"
        role="presentation"
        onClick={toggleModal}
      />
      <div className="modal-content">
        <div className="box">
          <p className="title">
            {modalTitle}
          </p>
          <Component {...rest} />
        </div>
      </div>
      <button className="modal-close is-large" onClick={toggleModal} />
    </div>
  );
};

Modal.propTypes = {
  component: PropTypes.func,
  isModalOpen: PropTypes.bool.isRequired,
  modalTitle: PropTypes.string.isRequired,
  toggleModal: PropTypes.func.isRequired,
};

export default Modal;
