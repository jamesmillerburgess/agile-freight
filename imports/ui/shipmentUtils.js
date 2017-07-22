import { Meteor } from 'meteor/meteor';

const save = (shipmentId, shipment) => {
  Meteor.call('shipment.save', { _id: shipmentId, ...shipment });
};

const archive = (shipmentId) => {
  Meteor.call('shipment.archive', shipmentId);
};

const Shipment = {
  save,
  archive,
};

export default Shipment;
