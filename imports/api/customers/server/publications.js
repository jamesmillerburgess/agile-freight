import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

import { Customers } from '../customers-collection';

Meteor.publish('customers.search', function customersSearch(filter) {
  check(filter, String);

  if (!filter || !this.userId) {
    return null;
  }

  return Customers.find({
    creator: this.userId,
    search: { $regex: filter, $options: 'i' },
  }, { limit: 10 });
});
