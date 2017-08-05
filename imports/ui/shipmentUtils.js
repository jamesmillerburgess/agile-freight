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

const movementStatus = (shipment) => {
  if (!shipment || !shipment.movement) {
    return 'Not Received';
  }
  if (shipment.movement.deliveryStatus === 'Actual') {
    return 'Delivered';
  }
  if (shipment.movement.arrivalStatus === 'Actual') {
    return 'Arrived';
  }
  if (shipment.movement.departureStatus === 'Actual') {
    return 'Departed';
  }
  if (shipment.movement.receiptStatus === 'Actual') {
    return 'Received';
  }
  return 'Not Received';
};

const route = (shipment) => {
  if (!shipment || !shipment.movement) {
    return 'No Route';
  }
  let res = '';
  if (shipment.movement.receipt) {
    res += shipment.movement.receipt.code;
  }
  if (shipment.movement.departure) {
    res += (res ? '-' : '') + shipment.movement.departure.code;
  }
  if (shipment.movement.arrival) {
    res += (res ? '-' : '') + shipment.movement.arrival.code;
  }
  if (shipment.movement.delivery) {
    res += (res ? '-' : '') + shipment.movement.delivery.code;
  }

  return res || 'No Route';
};

const Shipment = {
  save,
  archive,
  confirm,
  movementStatus,
  route,
};

export default Shipment;
