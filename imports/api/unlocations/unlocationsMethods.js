import { Meteor } from 'meteor/meteor';
import { check, Match } from 'meteor/check';

import { UNLocations } from './unlocationsCollection';

import { buildSearchRegExp } from '../../ui/searchUtils';

/**
 * Pattern for searching for locations.
 * @type {{id: *, search: *, country: *, locations: Boolean, airports: Boolean,
 *   seaports: Boolean}}
 */
const unlocationsSearchPattern = {
  id: Match.Maybe(String),
  search: Match.Maybe(String),
  country: Match.Maybe(String),
  locations: Boolean,
  airports: Boolean,
  seaports: Boolean,
};

/**
 * Finds the first ten non-airport, non-seaport locations with a given query.
 * @param query
 */
const getLocations = query => UNLocations
  .find({ ...query, isSeaport: false, isAirport: false }, { limit: 10 })
  .fetch();

/**
 * Finds the first ten airports with a given query.
 * @param query
 */
const getAirports = query => UNLocations
  .find({ ...query, isAirport: true }, { limit: 10 })
  .fetch();

/**
 * Finds the first ten seaports with a given query.
 * @param query
 */
const getSeaports = query => UNLocations
  .find({ ...query, isSeaport: true }, { limit: 10 })
  .fetch();

/**
 * Searches for unlocations based on a variety of options.
 * @param options
 * @returns {*}
 */
const unlocationsSearch = (options) => {
  check(options, unlocationsSearchPattern);

  const { id, search, country, locations, airports, seaports } = options;

  // Prioritize a search by id
  if (!search && id) {
    return UNLocations.find({ _id: id }).fetch();
  }

  // Build up the query, with optional search within a country
  const query = { search: { $regex: buildSearchRegExp(search) } };
  if (country) {
    query.countryCode = country;
  }

  // Pull in the results from each type specified in the options
  let results = [];
  if (locations) {
    results = [...results, ...getLocations(query)];
  }
  if (airports) {
    results = [...results, ...getAirports(query)];
  }
  if (seaports) {
    results = [...results, ...getSeaports(query)];
  }
  return results;
};

Meteor.methods({ 'unlocations.search': unlocationsSearch });
