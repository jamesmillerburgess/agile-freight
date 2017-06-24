import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';

const BranchField = props => (
  <Select
    value={props.value}
    valueKey="_id"
    labelKey="name"
    options={props.options}
    clearable={false}
    onChange={selected => props.onChange(selected)}
  />
);

BranchField.propTypes = {
  value: PropTypes.string,
  options: PropTypes.array,
  onChange: PropTypes.func,
};

export default BranchField;
