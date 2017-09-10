import React from 'react';
import Select from 'react-select';

export const loadStakeholders = () => null;

const StakeholderField = () => {
  return <Select.Async loadOptions={loadStakeholders} />;
};


export default StakeholderField;
