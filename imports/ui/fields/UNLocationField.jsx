import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import { Meteor } from 'meteor/meteor';

/**
 * Maps the results from the search into options objects that the select field
 * can read.
 * @param results
 */
const mapSearchResultsToOptions = results => results.map(opt => ({
  ...opt,
  // value: opt._id,
  // label: opt.name,
  // isSeaport: opt.isSeaport,
  // isAirport: opt.isAirport,
  // code: opt.countryCode + opt.locationCode,
}));

// TODO: Combine with most-used locations in a smart way
/**
 * Handles the search results from the Meteor Method 'unlocations.search'.
 * @param err
 * @param res
 * @param cb
 */
const handleSearchResults = (err, res, cb) => {
  const options = mapSearchResultsToOptions(res);
  cb(null, { options });
};

/**
 * Input field for selecting unlocations.
 * @param props
 * @returns {XML}
 * @constructor
 */
const UNLocationField = (props) => {
  const getOptions = (input, cb) => {
    const { location, locations, airports, seaports } = props;
    const searchOptions = {
      search: input || '',
      id: location._id,
      locations,
      airports,
      seaports,
    };
    Meteor.call(
      'unlocations.search',
      searchOptions,
      (err, res) => handleSearchResults(err, res, cb),
    );
  };

  const locationRenderer = option => (
    <div>
      {
        option.isSeaport ?
        (<span><span className="fa fa-fw fa-ship" />&nbsp;</span>) : ''
      }
      {
        option.isAirport ?
        (<span><span className="fa fa-fw fa-plane" />&nbsp;</span>) : ''
      }
      {option.name} – {option.code}
    </div>
  );

  return (
    <Select.Async
      value={props.location._id}
      valueKey="_id"
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
  location: PropTypes.object,
  onChange: PropTypes.func.isRequired,
  locations: PropTypes.bool,
  airports: PropTypes.bool,
  seaports: PropTypes.bool,
};

UNLocationField.defaultProps = {
  location: {},
  value: '',
  locations: false,
  airports: false,
  seaports: false,
};

export default UNLocationField;
