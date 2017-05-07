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
    this.state           = { options: [] };
    this.setOptions      = this.setOptions.bind(this);
    this.filterLocations = this.filterLocations.bind(this);
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
    const doc     = Countries.findOne({ _id: new Mongo.ObjectID(countryId) });
    const country = doc && doc.countryCode;
    const query   = { country };
    if (filter) {
      query.name = { $regex: filter, $options: 'i' };
    }
    const results = collection.find(query, { limit: 10 }).fetch();
    return results
      .map(unLocation => (
        {
          value: unLocation._id._str,
          label: `${unLocation.name}${unLocation.subdivision ? `, ${unLocation.subdivision}` : ''}`,
          count: this.props.topLocations[unLocation._id._str] ? this.props.topLocations[unLocation._id._str] : 0,
        }
      ))
      .sort((a, b) => {
        if (a.count !== b.count) {
          return b.count - a.count;
        }
        if (a.label.toUpperCase() < b.label.toUpperCase()) {
          return -1;
        }
        return 1;
      });
  }

  renderOption(option) {
    return (
      <div>
        <span className="option-label">{option.label}</span>
        {option.count ? <div className="option-count">{option.count}</div> : ''}
      </div>
    );
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
        optionRenderer={this.renderOption}
      />
    );
  }
}

UNLocationFieldInner.propTypes = {
  value: PropTypes.string,
  country: PropTypes.string,
  onChange: PropTypes.func,
  unLocations: PropTypes.object.isRequired,
  topLocations: PropTypes.object,
};

UNLocationFieldInner.defaultProps = {
  value: '',
  country: '',
  onChange: () => null,
  topLocations: {},
};

const UNLocationField = createContainer((props) => {
  const country          = Countries.findOne(new Mongo.ObjectID(props.country));
  const countryCode      = country ? country.countryCode : '';
  const locationsHandler = Meteor.subscribe('unlocations.country', countryCode);
  const loading          = !locationsHandler.ready();
  return { ...props };
}, UNLocationFieldInner);

export default UNLocationField;
