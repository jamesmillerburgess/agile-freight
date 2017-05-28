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
    if (this.props.value !== nextProps.value || !this.state.options) {
      this.setOptions(nextProps.value, this.getCountryCode(nextProps.country));
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
    return (
      <Select
        value={this.props.value}
        options={this.state.options}
        clearable={false}
        onChange={unLocation => this.props.onChange(unLocation)}
        onInputChange={input => this.setOptions(input, this.getCountryCode(this.props.country))}
        optionRenderer={this.renderOption}
      />
    );
  }
}

UNLocationField.propTypes = {
  value: PropTypes.string,
  countryCode: PropTypes.string,
  onChange: PropTypes.func,
  unLocations: PropTypes.object.isRequired,
};

UNLocationField.defaultProps = {
  value: '',
  countryCode: '',
  onChange: () => null,
  topLocations: {},
};

export default UNLocationField;
