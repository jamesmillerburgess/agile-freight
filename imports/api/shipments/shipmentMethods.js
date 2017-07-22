import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

import { Shipments } from './shipmentsCollection';
import { Quotes } from '../quotes/quotesCollection';
import { Customers } from '../customers/customersCollection';

Meteor.methods({
  'shipment.new': function shipmentNew(quoteId) {
    check(quoteId, String);

    const quote = Quotes.findOne(quoteId);
    if (!quote || !quote.customerId) {
      throw new Error('Invalid quote id');
    }
    const { customerId } = quote;
    const shipmentId = Shipments.insert({
      customerId,
      quoteId,
      createdOn: new Date(),
      active: true,
      status: 'Draft',
    });

    Quotes.update({ _id: quoteId }, { $push: { shipments: shipmentId } });
    Customers.update({ _id: customerId }, { $push: { shipments: shipmentId } });

    return shipmentId;
  },
});
