import { Meteor } from 'meteor/meteor';
import { check, Match } from 'meteor/check';

import { UNLocations } from './unlocationsCollection';
import { Countries } from '../countries/countriesCollection';

import { buildSearchRegExp } from '../../ui/searchUtils';

Meteor.methods({
  'unlocations.search': function unlocationsSearch(options) {
    check(options, {
      country: Match.Maybe(String),
      search: Match.Maybe(String),
      id: Match.Maybe(String),
    });

    if (!options.search && options.id) {
      return UNLocations.find({ _id: options.id }).fetch();
    }

    if (!Countries.findOne({ countryCode: options.country })) {
      throw new Error(`Invalid country '${options.country}'`);
    }
    const query = {
      countryCode: options.country,
      search: { $regex: buildSearchRegExp(options.search) },
    };
    return [
      ...UNLocations.find(
        { ...query, isSeaport: false, isAirport: false },
        { limit: 10 },
      ).fetch(),
      ...UNLocations.find(
        { ...query, isAirport: true },
        { limit: 10 },
      ).fetch(),
      ...UNLocations.find(
        { ...query, isSeaport: true },
        { limit: 10 },
      ).fetch(),
    ];
  },
});
