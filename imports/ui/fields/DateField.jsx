import React from 'react';
import PropTypes from 'prop-types';

import { dateFormat } from '../formatters/date-format';

const DateField = ({
  value,
  path,
  valueUdpateCallback,
}) => {
  const handleConfirmButtonClick = () => {
    valueUdpateCallback(path, value);
  };
  return (
    <div
      ref={node => this.node = node}
      className="dropdown"
    >

      {/* Field Button */}
      <div
        className="value-container dropdown-button"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
        onClick={this.handleFieldButtonClick}
      >
        <button className="value">
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
