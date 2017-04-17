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
    if (event.key === 'Enter' || event.key === 'Tab') {
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
    const { value, unit } = this.props;
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
          <button className={`value ${this.props.alignRight ? 'align-right' : 'align-left'}`}>
            <span>{value ? `${value} ${unit || ''}` : <span>&nbsp;</span>}</span>
          </button>
        </div>

        {/* Field Menu */}
        <div
          className="dropdown-menu"
          aria-labelledby="dropdownMenuButton"
        >
          <div className="input-container">
            <div className="input-row">
              <input
                className={`dropdown-text-input ${this.props.alignRight ? 'align-right' : 'align-left'}`}
                type="text"
                defaultValue={value}
                onKeyDown={this.handleDropdownTextInputKeyDown}
              />
            </div>
            { unit ? <div className="input-unit">{unit}</div> : '' }

          </div>

        </div>

      </div>
    );
  }
}

FreeTextField.propTypes = {
  value: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
  valueUpdateCallback: PropTypes.func.isRequired,
  alignRight: PropTypes.bool,
  unit: PropTypes.string,
};
