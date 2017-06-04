import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

import { UNLocations } from './unlocations-collection';
import { Countries } from '../countries/countriesCollection';

import { buildSearchRegExp } from '../../ui/searchUtils';

Meteor.methods({
  'unlocations.search': function unlocationsSearch(options) {
    check(options, Object);
    check(options.country, String);
    check(options.search, String);

    if (!Countries.findOne({ countryCode: options.country })) {
      throw new Error(`Invalid country '${options.country}'`);
    }
    const query = {
      country: options.country,
      name: { $regex: buildSearchRegExp(options.search) },
    };
    return UNLocations.find(query, { limit: 10 }).fetch();
  },
});
