import React from 'react';
import Select from 'react-select';
import { Meteor } from 'meteor/meteor';

export const renderStakeholder = stakeholder =>
  <div>
    {stakeholder.name}
  </div>;

const StakeholderField = props => {
  const loadStakeholders = (search, cb) => {
    const { fetchCustomers, fetchBranches, fetchSuppliers } = props;
    const query = { search, fetchCustomers, fetchBranches, fetchSuppliers };
    Meteor.call('stakeholder.search', query, (err, options) => {
      cb(null, { options });
    });
  };

  return (
    <Select.Async
      value={props.value}
      onChange={props.onChange}
      valueKey="_id"
      loadOptions={loadStakeholders}
      optionRenderer={renderStakeholder}
      valueRenderer={renderStakeholder}
      filterOption={() => true}
      autoload
      clearRenderer={() => null}
      arrowRenderer={() => null}
      placeholder=""
    />
  );
};

export default StakeholderField;
