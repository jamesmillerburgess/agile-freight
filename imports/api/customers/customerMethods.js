import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Customers } from './customersCollection';

Meteor.methods({
  'customer.new': function quotesNewMethod(options = {}) {
    // Check the parameters
    check(options, Object);

    // Fill in missing defaults
    const newCustomer = { ...options };
    if (!newCustomer.quotes) {
      newCustomer.quotes = [];
    }
    if (!newCustomer.shipments) {
      newCustomer.shipments = [];
    }

    // Insert the new customer
    return Customers.insert(newCustomer);
  },
});
