import React from 'react';
import Select from 'react-select';
import { Meteor } from 'meteor/meteor';

export const loadStakeholders = (search, cb) =>
  Meteor.call('customer.search', { search }, (err, options) => {
    cb(null, { options });
  });

export const renderStakeholder = stakeholder =>
  <div>
    {stakeholder.name}
  </div>;

const StakeholderField = props => {
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
