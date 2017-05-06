import React from 'react';
import PropTypes from 'prop-types';

const CheckboxField = ({ className, onClick, value, label }) => (
  <div className={`field ${className}`}>
    <button className="checkbox" onClick={onClick}>
      <span className={`fa fa-fw ${value ? 'fa-check' : ' '}`} />
    </button>
    <div className="checkbox-label">{label}</div>
  </div>
);

CheckboxField.propTypes = {
  className: PropTypes.string,
  onClick: PropTypes.func,
  value: PropTypes.bool,
  label: PropTypes.string,
};

CheckboxField.defaultProps = {
  className: '',
  onClick: () => null,
  value: false,
  label: '',
};

export default CheckboxField;
