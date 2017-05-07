import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Shipments } from './shipments';
import { Quotes } from '../quotes/quotes-collection';
import { Customers } from '../customers/customers-collection';

Meteor.methods({
  'shipments.new': function shipmentsNewMethod(options) {
    // Check the parameters
    check(options, Object);

    // Insert the new quote and grab the ID
    const shipmentId = Shipments.insert(options);

    const { customerId, quoteId } = options;

    Customers.update({ _id: customerId }, { $push: { shipments: shipmentId } });
    Quotes.update({ _id: quoteId }, { $push: { shipments: shipmentId } });
  },
});
