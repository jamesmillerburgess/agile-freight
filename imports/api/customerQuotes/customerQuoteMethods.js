import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

import { CustomerQuotes } from './customerQuotesCollection';
import { Customers } from '../customers/customers-collection';

Meteor.methods({
  'customerQuote.newFromRateSearch': function customerQuotesNewFromRateSearch(options) {
    check(options, Object);
    check(options.customerId, String);
    check(options.rateParameters, Object);

    // Check if the customerId is valid
    const customer = Customers.findOne(options.customerId);
    if (!customer) {
      throw new Error('Invalid customer ID');
    }

    const update = { ...options, status: 'Draft' };
    const customerQuoteId = CustomerQuotes.insert(update);
    Customers.update({ _id: options.customerId }, { $push: { customerQuotes: customerQuoteId } });
    return customerQuoteId;
  },
});
