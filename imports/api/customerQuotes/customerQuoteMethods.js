import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

import { CustomerQuotes } from './customerQuotesCollection';
import { Customers } from '../customers/customers-collection';

Meteor.methods({
  'customerQuote.newFromRateSearch': function customerQuotesNewFromRateSearch(options) {
    check(options, Object);
    check(options.customerId, String);
    check(options.cargo, Object);
    check(options.movement, Object);
    check(options.otherServices, Object);

    // Check if the customerId is valid
    const customer = Customers.findOne(options.customerId);
    if (!customer) {
      throw new Error('Invalid customer ID');
    }

    // Insert customer quote
    const update = {
      ...options,
      status: 'Draft',
      charges: [],
    };
    const customerQuoteId = CustomerQuotes.insert(update);

    // Update the customer
    Customers.update({ _id: options.customerId }, { $push: { customerQuotes: customerQuoteId } });
    return customerQuoteId;
  },
});
