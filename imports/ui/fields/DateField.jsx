import React from 'react';
import PropTypes from 'prop-types';

import { dateFormat } from '../formatters/date-format';

const DateField = ({
                     value,
                     path,
                     valueUpdateCallback,
                   }) => {
  const handleFieldButtonClick = () => {
    $('.dropdown-filter').select();
  };
  const handleConfirmButtonClick = () => {
    valueUpdateCallback(path, value);
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
          className="value"
          onClick={handleFieldButtonClick}
        >
          {dateFormat(value)}
        </button>
      </div>

      {/* Field Menu */}
      <div className="dropdown-menu event">
        <div href="#" className="dropdown-form">
          <input
            className="datetimepicker"
            type="text"
            defaultValue={dateFormat(value)}
          />
        </div>
        <button
          className="focis-button dropdown-textarea-confirm-button"
          onClick={handleConfirmButtonClick}
        >
          <i className="fa fa-fw fa-check" />
        </button>
      </div>

    </div>
  );
};

DateField.propTypes = {
  value: PropTypes.string,
  path: PropTypes.string,
  valueUpdateCallback: PropTypes.func,
};

DateField.defaultProps = {
  value: '',
  path: '',
  valueUpdateCallback: () => null,
};

export default DateField;
