import { Meteor } from 'meteor/meteor';

const save = (shipmentId, shipment) =>
  Meteor.call('shipment.save', { _id: shipmentId, ...shipment });

const archive = (shipmentId, shipment) =>
  Meteor.call('shipment.archive', shipmentId);

const confirm = (shipmentId, shipment) =>
  Meteor.call('shipment.confirm', { _id: shipmentId, ...shipment });

const Shipment = {
  save,
  archive,
  confirm,
};

export default Shipment;
