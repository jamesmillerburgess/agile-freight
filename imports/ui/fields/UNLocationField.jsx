import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import { Meteor } from 'meteor/meteor';

const mapSearchResultsToOptions = results => results.map(opt => ({
  value: opt._id,
  label: opt.name,
  isSeaport: opt.isSeaport,
  isAirport: opt.isAirport,
  code: opt.countryCode + opt.locationCode,
}));

const UNLocationField = (props) => {
  const getOptions = (input, cb) => {
    const { value, locations, airports, seaports } = props;
    Meteor.call(
      'unlocations.search',
      { search: input, id: value, locations, airports, seaports },
      (err, res) => {
        const options = mapSearchResultsToOptions(res);
        cb(null, { options });
      },
    );
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
      {option.label} – {option.code}
    </div>
  );

  return (
    <Select.Async
      value={props.value}
      loadOptions={getOptions}
      filterOption={() => true}
      optionRenderer={locationRenderer}
      valueRenderer={locationRenderer}
      onChange={unLocation => props.onChange(unLocation)}
      autoload
      clearRenderer={() => null}
      arrowRenderer={() => null}
      placeholder=""
    />
  );
};

UNLocationField.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  locations: PropTypes.bool,
  airports: PropTypes.bool,
  seaports: PropTypes.bool,
};

UNLocationField.defaultProps = {
  value: '',
  locations: false,
  airports: false,
  seaports: false,
};

export default UNLocationField;
