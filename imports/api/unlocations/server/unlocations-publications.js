import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

import { UNLocations } from '../unlocations-collection';

Meteor.publish('unlocations.country', (country = '') => {
  check(country, String);
  return UNLocations.find({ country });
});
