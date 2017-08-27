import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

import { Shipments } from './shipmentsCollection';
import { Quotes } from '../quotes/quotesCollection';
import { Customers } from '../customers/customersCollection';
import { Branches } from '../branch/branchCollection';

const shipmentNew = quoteId => {
  check(quoteId, String);

  const quote = Quotes.findOne(quoteId);
  if (!quote || !quote.customerId) {
    throw new Error('Invalid quote id');
  }
  const { customerId, cargo, movement, otherServices, charges } = quote;
  const { branch } = Customers.findOne(customerId);
  const shipmentId = Shipments.insert({
    customerId,
    cargo,
    movement,
    otherServices,
    charges,
    quoteId,
    createdOn: new Date(),
    active: true,
    status: 'Unconfirmed',
    reference: Meteor.call('branch.nextReference', branch),
    branch,
  });

  Quotes.update({ _id: quoteId }, { $push: { shipments: shipmentId } });
  Customers.update({ _id: customerId }, { $push: { shipments: shipmentId } });
  Branches.update(branch, {
    $push: { references: { type: 'Shipment', reference: shipmentId } },
  });

  return shipmentId;
};

const shipmentSave = shipment => {
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
};

const shipmentArchive = shipmentId => {
  check(shipmentId, String);

  Shipments.update(
    { _id: shipmentId },
    { $set: { active: false, status: 'Archived' } },
  );
};

const shipmentConfirm = shipment => {
  check(shipment, Object);
  check(shipment._id, String);

  if (!Shipments.findOne(shipment._id)) {
    return null;
  }

  Shipments.update(shipment._id, { $set: { status: 'Confirmed' } });
  Meteor.call('shipment.save', shipment);
  return Shipments.findOne(shipment._id);
};

Meteor.methods({
  'shipment.new': shipmentNew,
  'shipment.save': shipmentSave,
  'shipment.archive': shipmentArchive,
  'shipment.confirm': shipmentConfirm,
});
