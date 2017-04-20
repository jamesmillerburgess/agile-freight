import React from 'react';
import PropTypes from 'prop-types';
import $ from 'jquery';

const FreeTextField = ({
                         value,
                         path,
                         valueUpdateCallback,
                         alignRight,
                         unit,
                       }) => {
  const handleDropdownTextInputKeyDown = (event) => {
    if (event.key === 'Enter' || event.key === 'Tab') {
      const newValue = event.target.value;
      const needUpdate = value !== newValue;

      // Update if needed and reset the UI because it displays the value twice otherwise
      if (needUpdate) {
        valueUpdateCallback(path, newValue);
      }

      // Toggle the dropdown
      $(event.target).parents('.dropdown').removeClass('show');
    }
  };

  return (
    <div className="dropdown">

      {/* Field Button */}
      <div
        className="value-container dropdown-button"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
      >
        <button
          className={`value ${alignRight ? 'align-right' : 'align-left'}`}
          onClick={() => $('.dropdown-text-input').select()}
        >
          {unit ? `${value} ${unit}` : value}
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
              className={`dropdown-text-input ${alignRight ? 'align-right' : 'align-left'}`}
              type="text"
              defaultValue={value}
              onKeyDown={handleDropdownTextInputKeyDown}
            />
          </div>
          { unit ? <div className="input-unit">{unit}</div> : '' }
        </div>
      </div>
    </div>
  );
};

FreeTextField.propTypes = {
  value: PropTypes.string,
  path: PropTypes.string,
  valueUpdateCallback: PropTypes.func,
  alignRight: PropTypes.bool,
  unit: PropTypes.string,
};

FreeTextField.defaultProps = {
  value: '',
  path: '',
  valueUpdateCallback: () => null,
  alignRight: false,
  unit: '',
};

export default FreeTextField;
