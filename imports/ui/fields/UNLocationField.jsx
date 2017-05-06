import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import { UNLocations } from '../../api/unlocations/unlocations-collection';

class UNLocationFieldInner extends React.Component {
  constructor(props) {
    super(props);
    this.state      = { options: [] };
    this.setOptions = this.setOptions.bind(this);
  }

  setOptions(input) {
    const { country } = this.props;
    const query       = { country, name: { $regex: input, $options: 'i' } };
    const options     = UNLocations.find(query, { limit: 10 }).fetch().map(unLocation => ({
      value: unLocation.locationCode,
      label: `${unLocation.name}${unLocation.subdivision ? `, ${unLocation.subdivision}` : ''}`,
    }));
    this.setState({ options });
  }

  render() {
    const { value, onChange } = this.props;
    const { options }         = this.state;
    return (
      <div>
        <Select
          value={value}
          options={options}
          clearable={false}
          onChange={unLocation => onChange(unLocation)}
          onInputChange={this.setOptions}
        />
      </div>
    );
  }
}

UNLocationFieldInner.propTypes = {
  value: PropTypes.string,
  country: PropTypes.string,
  onChange: PropTypes.func,
};

UNLocationFieldInner.defaultProps = {
  value: '',
  country: '',
  onChange: () => null,
};

const UNLocationField = createContainer((props) => {
  const { country } = props;
  Meteor.subscribe('unlocations.country', country);
  return {
    ...props,
  };
}, UNLocationFieldInner);

export default UNLocationField;
