import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

import { Countries } from '../../api/countries/countriesCollection';

const UNLocationField = (props) => {
  const getCountryCode = (id) => {
    const country = Countries.findOne(new Mongo.ObjectID(id));
    if (!country || !country.countryCode) {
      return '';
    }
    return country.countryCode;
  };

  const getOptions = (input, cb) => {
    const countryCode = getCountryCode(props.country);
    if (!countryCode) {
      cb(null, []);
    } else {
      Meteor.call(
        'unlocations.search',
        {
          country: countryCode,
          search: input,
          id: props.value,
        },
        (err, res) => {
          const options = res.map(opt => ({
            value: opt._id,
            label: opt.name,
            isSeaport: opt.isSeaport,
            isAirport: opt.isAirport,
            code: opt.countryCode + opt.locationCode,
          }));
          cb(null, { options });
        },
      );
    }
  };

  const locationRenderer = option => (
    <div>
      {
        option.isSeaport ?
        (
          <span><span className="fa fa-fw fa-ship" />&nbsp;</span>
        ) : ''}
      {
        option.isAirport ?
        (
          <span><span className="fa fa-fw fa-plane" />&nbsp;</span>
        ) : ''}
      {option.code} – {option.label}
    </div>
  );

  return (
    props.country ?
    (
      <Select.Async
        value={props.value}
        loadOptions={getOptions}
        cache={false}
        filterOption={() => true}
        optionRenderer={locationRenderer}
        valueRenderer={locationRenderer}
        onChange={unLocation => props.onChange(unLocation)}
        autoload
        clearRenderer={() => null}
      />
    ) :
    (<Select disabled />)
  );
};

UNLocationField.propTypes = {
  value: PropTypes.string,
  country: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

UNLocationField.defaultProps = {
  value: '',
  country: '',
};

export default UNLocationField;
