import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

import { Customers } from '../customers';
import { Quotes } from '../../quotes/quotes-collection';

Meteor.publish('customers.single', (_id) => {
  check(_id, String);
  const cursors = [];
  cursors.push(Customers.find(_id));
  cursors.push(Quotes.find({ customerId: _id }));
  return cursors;
});

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
