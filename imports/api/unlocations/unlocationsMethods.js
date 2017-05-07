import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

import { UNLocations } from './unlocations-collection';

Meteor.methods({
  'unlocations.search': function unlocationsSearch(options) {
    check(options, Object);
    check(options.country, String);
    check(options.search, String);

    const query = { country: options.country, name: { $regex: options.search, $options: 'i' } };
    return UNLocations.find(query, { limit: 10 });
  },
});
