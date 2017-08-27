import React from 'react';
import PropTypes from 'prop-types';

const ToggleButton = ({ label, active, onClick }) => (
  <button
    className={`${active ? 'active' : ''} filter-button radio-button`}
    onClick={onClick}
  >
    {label}
  </button>
);

ToggleButton.propTypes = {
  label: PropTypes.string,
  active: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

ToggleButton.defaultProps = {
  label: '',
};

export default ToggleButton;
