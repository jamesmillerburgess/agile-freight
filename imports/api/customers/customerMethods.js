import { Meteor } from 'meteor/meteor';
import { check, Match } from 'meteor/check';
import { Customers } from './customersCollection';

Meteor.methods({
  'customer.new': function customerNewMethod(options = {}) {
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
  'customer.save': function customerSaveMethod(customerId, options) {
    check(customerId, String);
    check(options, {
      name: Match.Maybe(String),
      address: Match.Maybe(String),
      emailAddress: Match.Maybe(String),
      currency: Match.Maybe(String),
      branch: Match.Maybe(String),
      quotes: Match.Maybe(Array),
      shipments: Match.Maybe(Array),
    });

    Customers.update({ _id: customerId }, { $set: options });
  },
});
