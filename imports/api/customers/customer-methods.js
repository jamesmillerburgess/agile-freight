import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Customers } from '../customers/customers';

Meteor.methods({
  'customer.new': function quotesNewMethod(options) {
    // Check the parameters
    check(options, Object);

    // Insert the new customer
    Customers.insert(options);
  },
});
