import React from 'react';
import PropTypes from 'prop-types';

const PageControl = ({
  currentPage,
  setNextPage,
  setPreviousPage,
  totalPages,
}) =>
  <nav className="pagination is-centered" style={{ margin: '1em 0' }}>
    <a
      className="pagination-previous"
      disabled={currentPage === 1}
      onClick={setPreviousPage}
      role="presentation"
    >
      {'<'}
    </a>
    <a
      className="pagination-next"
      disabled={currentPage === totalPages}
      onClick={setNextPage}
      role="presentation"
    >
      {'>'}
    </a>
    <ul className="pagination-list" />
  </nav>;

PageControl.propTypes = {
  currentPage: PropTypes.number.isRequired,
  setNextPage: PropTypes.func.isRequired,
  setPreviousPage: PropTypes.func.isRequired,
  totalPages: PropTypes.number.isRequired,
};

export default PageControl;
