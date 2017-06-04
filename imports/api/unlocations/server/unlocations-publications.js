import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

import { UNLocations } from '../unlocationsCollection';

Meteor.publish('unlocations.list', (list = []) => {
  check(list, Array);
  return UNLocations.find({ _id: { $in: list } });
});

Meteor.publish('unlocations.country', (country = '') => {
  check(country, String);
  return UNLocations.find({ country });
});
