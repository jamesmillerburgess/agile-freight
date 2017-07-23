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
    const { customerId, cargo, movement, otherServices } = quote;
    const shipmentId = Shipments.insert({
      customerId,
      cargo,
      movement,
      otherServices,
      quoteId,
      createdOn: new Date(),
      active: true,
      status: 'Draft',
    });

    Quotes.update({ _id: quoteId }, { $push: { shipments: shipmentId } });
    Customers.update({ _id: customerId }, { $push: { shipments: shipmentId } });

    return shipmentId;
  },
  'shipment.save': function shipmentSave(shipment) {
    check(shipment, Object);

    Shipments.update(
      { _id: shipment._id },
      {
        $set: {
          cargo: shipment.cargo,
        },
      },
    );
  },
  'shipment.archive': function shipmentArchive(shipmentId) {
    check(shipmentId, String);

    Shipments.update(
      { _id: shipmentId },
      { $set: { active: false, status: 'Archived' } },
    );
  },
});
