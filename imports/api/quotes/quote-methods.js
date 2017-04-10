import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Quotes } from './quotes';
import { Customers } from '../customers/customers';

Meteor.methods({
  'quotes.new': function quotesNewMethod(options) {
    // Check the parameters
    check(options, Object);

    // Insert the new quote and grab the ID
    const quoteId = Quotes.insert(options);

    const { customerId } = options;

    Customers.update({ _id: customerId }, { $push: { quotes: quoteId } });
  },
});
