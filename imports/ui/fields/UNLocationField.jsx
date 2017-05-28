import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { createContainer } from 'meteor/react-meteor-data';
import { Countries } from '../../api/countries/countries-collection';

class UNLocationField extends React.Component {
  constructor(props) {
    super(props);
    this.state = { options: [] };
    this.setOptions = this.setOptions.bind(this);
  }

  componentWillUpdate(nextProps) {
    if (this.props.value.value !== nextProps.value.value) {
      this.setOptions(nextProps.value.label, this.getCountryCode(nextProps.country));
    }
  }

  setOptions(input = '', countryCode = '') {
    if (!countryCode) {
      return;
    }
    Meteor.call('unlocations.search', {
      country: countryCode,
      search: input,
    }, (err, res) => {
      const options = res.map(loc => ({ value: loc._id._str, label: loc.name }));
      this.setState({ options });
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

  getCountryCode(id) {
    const country = Countries.findOne(new Mongo.ObjectID(id));
    if (!country || !country.countryCode) {
      return '';
    }
    return country.countryCode;
  }

  render() {
    const { value, onChange } = this.props;
    const { options }         = this.state;
    return (
      <Select
        value={value.value}
        options={options}
        clearable={false}
        onChange={unLocation => onChange(unLocation)}
        onInputChange={input => this.setOptions(input, this.getCountryCode(this.props.country))}
        optionRenderer={this.renderOption}
      />
    );
  }
}

UNLocationField.propTypes = {
  value: PropTypes.object,
  countryCode: PropTypes.string,
  onChange: PropTypes.func,
  unLocations: PropTypes.object.isRequired,
  topLocations: PropTypes.object,
};

UNLocationField.defaultProps = {
  value: {},
  countryCode: '',
  onChange: () => null,
  topLocations: {},
};

export default UNLocationField;
