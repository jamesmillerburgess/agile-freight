import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

class CountryField extends React.Component {
  constructor(props) {
    super(props);
    this.state      = { options: [] };
    this.setOptions = this.setOptions.bind(this);
  }

  componentWillMount() {
    this.setOptions('');
  }

  setOptions(input) {
    const { countries } = this.props;
    const query         = { countryName: { $regex: input, $options: 'i' } };
    const options       = countries.find(query).fetch().map(country => ({
      value: country._id._str,
      label: country.countryName,
    }));
    this.setState({ options });
  }

  render() {
    const { value, onChange } = this.props;
    const { options }         = this.state;
    return (
      <Select
        value={value}
        options={options}
        clearable={false}
        onChange={country => onChange(country)}
        onInputChange={this.setOptions}
      />
    );
  }
}

CountryField.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
  countries: PropTypes.object.isRequired,
};

CountryField.defaultProps = {
  value: '',
  onChange: () => null,
};

export default CountryField;
