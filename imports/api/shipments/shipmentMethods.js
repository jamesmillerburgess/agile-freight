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
    const { customerId, cargo, movement, otherServices, charges } = quote;
    const shipmentId = Shipments.insert({
      customerId,
      cargo,
      movement,
      otherServices,
      charges,
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

    if (!Shipments.findOne(shipment._id)) {
      return;
    }

    const {
      shipper,
      shipperAddress,
      consignee,
      consigneeAddress,
      notifyParty,
      notifyPartyAddress,
      customerReference,
      blType,
      cargo,
      movement,
    } = shipment;
    Shipments.update(
      { _id: shipment._id },
      {
        $set: {
          shipper,
          shipperAddress,
          consignee,
          consigneeAddress,
          notifyParty,
          notifyPartyAddress,
          customerReference,
          blType,
          cargo,
          movement,
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
  'shipment.confirm': function shipmentConfirm(shipment) {
    check(shipment, Object);
    check(shipment._id, String);

    if (!Shipments.findOne(shipment._id)) {
      return null;
    }

    Shipments.update(shipment._id, { $set: { status: 'Confirmed' } });
    Meteor.call('shipment.save', shipment);
    return Shipments.findOne(shipment._id);
  },
});
