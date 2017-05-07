import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { createContainer } from 'meteor/react-meteor-data';
import { Countries } from '../../api/countries/countries-collection';

class UNLocationFieldInner extends React.Component {
  constructor(props) {
    super(props);
    this.state      = { options: [] };
    this.setOptions = this.setOptions.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const options = this.filterLocations('', nextProps.country, this.props.unLocations);
    this.setState({ options });
  }

  setOptions(input) {
    const { country, unLocations } = this.props;
    const options                  = this.filterLocations(input, country, unLocations);
    this.setState({ options });
  }

  filterLocations(filter, countryId, collection) {
    if (!countryId) {
      return [];
    }
    console.log(new Mongo.ObjectID(countryId));
    console.log(Countries.findOne(new Mongo.ObjectID(countryId)).countryCode);
    const country = Countries.findOne({ _id: new Mongo.ObjectID(countryId) }).countryCode;
    const query = { country };
    if (filter) {
      query.name = { $regex: filter, $options: 'i' };
    }
    const results = collection.find(query, { limit: 10 }).fetch();
    console.log('results');
    console.log(collection.find(query, { limit: 10 }).fetch());
    return results.map(unLocation => ({
      value: unLocation._id._str,
      label: `${unLocation.name}${unLocation.subdivision ? `, ${unLocation.subdivision}` : ''}`,
    }));
  }

  render() {
    const { value, onChange } = this.props;
    const { options }         = this.state;
    return (
      <Select
        value={value}
        options={options}
        clearable={false}
        onChange={unLocation => onChange(unLocation)}
        onInputChange={this.setOptions}
      />
    );
  }
}

UNLocationFieldInner.propTypes = {
  value: PropTypes.string,
  country: PropTypes.string,
  onChange: PropTypes.func,
  unLocations: PropTypes.object.isRequired,
};

UNLocationFieldInner.defaultProps = {
  value: '',
  country: '',
  onChange: () => null,
};

const UNLocationField = createContainer((props) => {
  const country = Countries.findOne(new Mongo.ObjectID(props.country));
  const countryCode = country ? country.countryCode : '';
  const locationsHandler = Meteor.subscribe('unlocations.country', countryCode);
  const loading = !locationsHandler.ready();
  return { ...props };
}, UNLocationFieldInner);

export default UNLocationField;
