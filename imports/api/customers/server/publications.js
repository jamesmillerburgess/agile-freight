import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

import { Customers } from '../customers';

import { Quotes } from '../../quotes/quotes';

Meteor.publish('customers.single', (_id) => {
  check(_id, String);
  const cursors = [];
  cursors.push(Customers.find(_id));
  cursors.push(Quotes.find({ customerId: _id }));
  return cursors;
});
