import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import { Meteor } from 'meteor/meteor';

/**
 * Input field for selecting unlocations.
 * @param props
 * @returns {XML}
 * @constructor
 */
const UNLocationField = (props) => {
  // TODO: Combine with most-used locations in a smart way
  const getOptions = (input, cb) => {
    const { location, locations, airports, seaports } = props;
    const searchOptions = {
      search: input || location.code,
      id: location._id,
      locations,
      airports,
      seaports,
    };
    Meteor.call(
      'unlocations.search',
      searchOptions,
      (err, options) => cb(null, { options }),
    );
  };

  /**
   * Render locations in the value and option elements of the Select component.
   * @param option
   */
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
      {
        option.name ?
        `${option.name} – ${option.code}` : ''
      }
    </div>
  );

  // Display an empty select until the state has been loaded.
  // This prevents 'autoload' from searching for results with an empty value.
  // TODO: Find a way to load the state before initial render of this element
  return (
    <Select.Async
      value={props.location}
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
