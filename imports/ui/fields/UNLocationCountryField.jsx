import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';

const UNLocationCountryField = ({ value, onChange }) => (
  <Select
    value={value}
    options={[
      { value: 'US', label: 'United States' },
      { value: 'CN', label: 'China' },
      { value: 'IN', label: 'India' },
    ]}
    clearable={false}
    onChange={country => onChange(country)}
  />
);

UNLocationCountryField.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
};

UNLocationCountryField.defaultProps = {
  value: '',
  onChange: () => null,
};

export default UNLocationCountryField;
