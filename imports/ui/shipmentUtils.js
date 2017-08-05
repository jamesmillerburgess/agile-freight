import { Meteor } from 'meteor/meteor';

const save = (shipmentId, shipment) =>
  Meteor.call('shipment.save', { _id: shipmentId, ...shipment });

const archive = (shipmentId, shipment, cb) =>
  Meteor.call('shipment.archive', shipmentId, (err, res) => cb(res));

const confirm = (shipmentId, shipment, cb) =>
  Meteor.call(
    'shipment.confirm',
    { _id: shipmentId, ...shipment },
    (err, res) => cb(res),
  );

const Shipment = {
  save,
  archive,
  confirm,
};

export default Shipment;
