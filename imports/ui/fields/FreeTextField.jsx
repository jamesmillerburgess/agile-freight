import React from 'react';
import PropTypes from 'prop-types';

export default class FreeTextField extends React.Component {
  constructor(props) {
    super(props);
    this.handleFieldButtonClick = this.handleFieldButtonClick.bind(this);
    this.handleDropdownTextInputKeyDown = this.handleDropdownTextInputKeyDown.bind(this);
  }

  handleFieldButtonClick() {
    $('.dropdown-text-input').select();
  }

  handleDropdownTextInputKeyDown(event) {
    if (event.key === 'Enter') {
      const value = event.target.value;
      const needUpdate = this.props.value !== value;

      // Update if needed and reset the UI because it displays the value twice otherwise
      if (needUpdate) {
        this.props.valueUpdateCallback(this.props.path, value);
      }

      // Toggle the dropdown
      $(event.target).parents('.dropdown').removeClass('show');
    }
  }

  render() {
    const { value } = this.props;
    return (
      <div className="dropdown">

        {/* Field Button */}
        <div
          className="value-container dropdown-button"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
          onClick={this.handleFieldButtonClick}
        >
          <button className="value">
            <span>{value}</span>
          </button>
        </div>

        {/* Field Menu */}
        <div
          className="dropdown-menu"
          aria-labelledby="dropdownMenuButton"
        >
          <input
            className="dropdown-text-input"
            type="text"
            defaultValue={value}
            onKeyDown={this.handleDropdownTextInputKeyDown}
          />
        </div>

      </div>
    );
  }
}

FreeTextField.propTypes = {
  value: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
  valueUpdateCallback: PropTypes.func.isRequired,
};
