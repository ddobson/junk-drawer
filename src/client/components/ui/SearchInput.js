import React, { Component } from 'react';
import PropTypes from 'prop-types';

class SearchInput extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.props.setSearchKeyword(event.target.value);
  }

  render() {
    return (
      <div style={{ marginBottom: '1.5rem' }}>
        <p className="control has-icons-right">
          <input
            type="text"
            className="input"
            placeholder="Search"
            onChange={this.handleChange}
          />
          <span className="icon is-small is-right">
            <i className="fa fa-search" />
          </span>
        </p>
      </div>
    );
  }
}

SearchInput.propTypes = {
  setSearchKeyword: PropTypes.func.isRequired,
};

export default SearchInput;
