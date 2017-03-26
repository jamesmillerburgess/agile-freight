import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

import { Rates } from './rates.js';

Meteor.methods({
  'rates.singleSearch': function singleSearch(fromLocation, toLocation) {
    // Check the parameters
    check(fromLocation, String);
    check(toLocation, String);

    // Build the query
    const query = { fromLocation, toLocation };

    // Search
    return Rates.find(query);
  },
});
