import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

import { CustomerQuotes } from './customerQuotesCollection';

Meteor.methods({
  'customerQuote.newFromRateSearch': function customerQuotesNewFromRateSearch(options) {
    check(options, Object);
    check(options.customerId, String);
    check(options.rateParameters, Object);

    const update = { ...options, status: 'Draft' };
    return CustomerQuotes.insert(update);
  },
});
