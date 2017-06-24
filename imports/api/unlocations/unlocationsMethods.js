import { Meteor } from 'meteor/meteor';
import { check, Match } from 'meteor/check';

import { UNLocations } from './unlocationsCollection';
import { Countries } from '../countries/countriesCollection';

import { buildSearchRegExp } from '../../ui/searchUtils';

const unlocationsSearchPattern = {
  country: Match.Maybe(String),
  search: Match.Maybe(String),
  id: Match.Maybe(String),
  locations: Boolean,
  airports: Boolean,
  seaports: Boolean,
};

const unlocationsSearch = (options) => {
  check(options, unlocationsSearchPattern);

  if (!options.search && options.id) {
    return UNLocations.find({ _id: options.id }).fetch();
  }
  //
  // if (!Countries.findOne({ countryCode: options.country })) {
  //   throw new Error(`Invalid country '${options.country}'`);
  // }
  const query = {
    // countryCode: options.country,
    search: { $regex: buildSearchRegExp(options.search) },
  };
  let results = [];
  if (options.locations) {
    results = [
      ...results,
      ...UNLocations.find(
        { ...query, isSeaport: false, isAirport: false },
        { limit: 10 },
      ).fetch(),
    ];
  }
  if (options.airports) {
    results = [
      ...results,
      ...UNLocations.find(
        { ...query, isAirport: true },
        { limit: 10 },
      ).fetch(),
    ];
  }
  if (options.seaports) {
    results = [
      ...results,
      ...UNLocations.find(
        { ...query, isSeaport: true },
        { limit: 10 },
      ).fetch(),
    ];
  }
  return results;
};

Meteor.methods({ 'unlocations.search': unlocationsSearch });
