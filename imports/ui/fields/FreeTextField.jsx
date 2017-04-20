import React from 'react';
import PropTypes from 'prop-types';

const FreeTextField = (props) => {

  const handleDropdownTextInputKeyDown = (event) => {
    if (event.key === 'Enter' || event.key === 'Tab') {
      const value = event.target.value;
      const needUpdate = props.value !== value;

      // Update if needed and reset the UI because it displays the value twice otherwise
      if (needUpdate) {
        props.valueUpdateCallback(props.path, value);
      }

      // Toggle the dropdown
      $(event.target).parents('.dropdown').removeClass('show');
    }
  };

    const { value, unit } = props;
    return (
      <div className="dropdown">

        {/* Field Button */}
        <div
          className="value-container dropdown-button"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
          onClick={() => $('.dropdown-text-input').select()}
        >
          <button className={`value ${props.alignRight ? 'align-right' : 'align-left'}`}>
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
                className={`dropdown-text-input ${props.alignRight ? 'align-right' : 'align-left'}`}
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
  value: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
  valueUpdateCallback: PropTypes.func.isRequired,
  alignRight: PropTypes.bool,
  unit: PropTypes.string,
};

export default FreeTextField;
