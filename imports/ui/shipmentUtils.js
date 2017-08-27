import { Meteor } from 'meteor/meteor';
import moment from 'moment';

import { weightFormat } from './formatters/numberFormatters';
import { Countries } from '../api/countries/countriesCollection';

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

const isInactive = (shipment) => {
  if (!shipment || !shipment.status) {
    return true;
  }
  return (shipment.status === 'Canceled' ||
          shipment.status === 'Archived' ||
          shipment.status === 'Closed');
};

const mode = shipment => {
  if (!shipment || !shipment.movement) {
    return '';
  }
  return shipment.movement.mode || '';
};

const originCountryCode = (shipment) => {
  if (!shipment || !shipment.movement) {
    return '';
  }
  if (shipment.movement.receipt) {
    return shipment.movement.receipt.countryCode.toLowerCase();
  }
  if (shipment.movement.departure) {
    return shipment.movement.departure.countryCode.toLowerCase();
  }
};

const originCountry = (shipment) => {
  if (!shipment || !shipment.movement) {
    return '';
  }
  if (shipment.movement.receipt) {
    return Countries
      .findOne({ countryCode: shipment.movement.receipt.countryCode })
      .name;
  }
  if (shipment.movement.departure) {
    return Countries
      .findOne({ countryCode: shipment.movement.departure.countryCode })
      .name;
  }
};

const destinationCountryCode = (shipment) => {
  if (!shipment || !shipment.movement) {
    return '';
  }
  if (shipment.movement.delivery) {
    return shipment.movement.delivery.countryCode.toLowerCase();
  }
  if (shipment.movement.arrival) {
    return shipment.movement.arrival.countryCode.toLowerCase();
  }
};

const destinationCountry = (shipment) => {
  if (!shipment || !shipment.movement) {
    return '';
  }
  if (shipment.movement.delivery) {
    return Countries
      .findOne({ countryCode: shipment.movement.delivery.countryCode })
      .name;
  }
  if (shipment.movement.arrival) {
    return Countries
      .findOne({ countryCode: shipment.movement.arrival.countryCode })
      .name;
  }
  return '';
};

const displayStatus = (shipment) => {
  if (!shipment || !shipment.status) {
    return 'Draft';
  }
  if (shipment.status === 'Confirmed') {
    return movementStatus(shipment);
  }
  if (shipment.status === 'Submitted') {
    return 'Quoted';
  }
  if (shipment.status === 'Draft') {
    return 'Draft Quote';
  }
  return shipment.status;
};

const cargoString = (shipment) => {
  if (!shipment || !shipment.cargo) {
    return '';
  }
  const { cargo } = shipment;
  if (cargo.cargoType === 'Containerized') {
    if (cargo.ratedQuote === true) {
      return 'RATED, CONTAINERIZED';
    }
    return `${cargo.totalContainers} UNIT${cargo.totalContainers !==
                                           1 ?
                                           'S' :
                                           ''}, ${cargo.totalTEU} TEU`;
  } else if (cargo.cargoType === 'Loose') {
    if (cargo.ratedQuote === true) {
      return 'RATED, LOOSE';
    }
    return `${cargo.totalPackages} pkg ` +
           `${weightFormat(cargo.totalVolume)} ${cargo.volumeUOM} ` +
           `${weightFormat(cargo.totalWeight)} ${cargo.weightUOM}`;
  }
  return 'NO CARGO ENTERED';
};

const displayDate = (shipment) => {
  if (!shipment || !shipment.status) {
    return '';
  }
  if (shipment.status === 'Draft') {
    return '';
  }
  if (shipment.status === 'Submitted') {
    return moment(shipment.expiryDate).format('D MMM, YYYY');
  }
  if (shipment.status === 'Confirmed') {
    return moment(shipment.movement.deliveryDate).format('D MMM, YYYY');
  }
  return '';
};

const displayDateLabel = (shipment) => {
  if (!shipment || !shipment.status) {
    return '';
  }
  const status = displayStatus(shipment);
  if (status === 'Draft') {
    return '';
  }
  if (status === 'Quoted') {
    return 'Expiry Date';
  }
  if (status === 'Expired') {
    return 'Expired On';
  }
  if (shipment.status === 'Confirmed') {
    if (shipment.movement && shipment.movement.deliveryStatus === 'Actual') {
      return 'Delivered';
    }
    return 'Est. Delivery';
  }
  return '';
};

const displayReceiptLocation = (shipment) => {
  if (!shipment || !shipment.movement || !shipment.movement.receipt) {
    return 'Not Planned';
  }
  return shipment.movement.receipt.name;
};

const displayDeparture = (shipment) => {
  if (!shipment || !shipment.movement || !shipment.movement.departure) {
    return 'Not Planned';
  }
  return shipment.movement.departure.name;
};

const displayDepartureStatus = (shipment) => {
  if (!shipment || !shipment.movement || !shipment.movement.departureDate) {
    return '';
  }
  if (shipment.movement.departureStatus === 'Actual') {
    return 'Departed';
  }
  return 'Est. Departure';
};

const displayDepartureDate = (shipment) => {
  if (!shipment || !shipment.movement || !shipment.movement.departureDate) {
    return '';
  }
  return moment(shipment.movement.departureDate).format('D MMM, YYYY');
};

const displayArrival = (shipment) => {
  if (!shipment || !shipment.movement || !shipment.movement.arrival) {
    return 'Not Planned';
  }
  return shipment.movement.arrival.name;
};

const displayArrivalStatus = (shipment) => {
  if (!shipment || !shipment.movement || !shipment.movement.arrivalDate) {
    return '';
  }
  if (shipment.movement.arrivalStatus === 'Actual') {
    return 'Arrived';
  }
  return 'Est. Arrival';
};

const displayArrivalDate = (shipment) => {
  if (!shipment || !shipment.movement || !shipment.movement.arrivalDate) {
    return '';
  }
  return moment(shipment.movement.arrivalDate).format('D MMM, YYYY');
};

const displayDelivery = (shipment) => {
  if (!shipment ||
      !shipment.movement ||
      !shipment.movement.delivery ||
      !shipment.movement.delivery.name) {
    return 'Not Planned';
  }
  return shipment.movement.delivery.name;
};

const displayDeliveryStatus = (shipment) => {
  if (!shipment || !shipment.movement || !shipment.movement.deliveryDate) {
    return '';
  }
  if (shipment.movement.deliveryStatus === 'Actual') {
    return 'Delivered';
  }
  return 'Est. Delivery';
};

const displayDeliveryDate = (shipment) => {
  if (!shipment || !shipment.movement || !shipment.movement.deliveryDate) {
    return '';
  }
  return moment(shipment.movement.deliveryDate).format('D MMM, YYYY');
};

const isReceived = (shipment) => {
  if (!shipment || !shipment.movement || !shipment.movement.receiptStatus) {
    return false;
  }
  return shipment.movement.receiptStatus === 'Actual';
};

const displayCargoReadyStatus = (shipment) => {
  if (!shipment || !shipment.movement || !shipment.movement.cargoReady) {
    return '';
  }
  return 'Cargo Ready';
};

const displayCargoReadyDate = (shipment) => {
  if (!shipment || !shipment.movement || !shipment.movement.cargoReady) {
    return '';
  }
  return shipment.movement.cargoReady.name;
};

const displayReceiptStatus = (shipment) => {
  if (!shipment || !shipment.movement || !shipment.movement.receiptDate) {
    return '';
  }
  if (shipment.movement.receiptStatus === 'Actual') {
    return 'Picked Up';
  }
  return 'Est. Pickup';
};

const displayReceiptDate = (shipment) => {
  if (!shipment || !shipment.movement || !shipment.movement.receiptDate) {
    return '';
  }
  return moment(shipment.movement.receiptDate).format('D MMM, YYYY');
};

const isDeliveredAtPort = (shipment) => {
  if (!shipment ||
      !shipment.movement ||
      !shipment.movement.deliveryAtPortStatus) {
    return false;
  }
  return shipment.movement.deliveryAtPortStatus === 'Actual';
};

const displayDeliveryAtPortStatus = (shipment) => {
  if (!shipment ||
      !shipment.movement ||
      !shipment.movement.deliveryAtPortStatus) {
    return '';
  }
  if (shipment.movement.deliveryAtPortStatus === 'Expected') {
    return 'Est. Delivery';
  }
  return 'Delivered';
};

const displayDeliveryAtPortDate = (shipment) => {
  if (!shipment ||
      !shipment.movement ||
      !shipment.movement.deliveryAtPortDate) {
    return '';
  }
  return moment(shipment.movement.deliveryAtPortDate).format('D MMM, YYYY');
};

const isDeparted = (shipment) => {
  if (!shipment || !shipment.movement || !shipment.movement.departureStatus) {
    return false;
  }
  return shipment.movement.departureStatus === 'Actual';
};

const isArrived = (shipment) => {
  if (!shipment || !shipment.movement || !shipment.movement.arrivalStatus) {
    return false;
  }
  return shipment.movement.arrivalStatus === 'Actual';
};

const isPickedUpAtPort = (shipment) => {
  if (!shipment ||
      !shipment.movement ||
      !shipment.movement.pickUpAtPortStatus) {
    return false;
  }
  return shipment.movement.pickUpAtPortStatus === 'Actual';
};

const displayPickupAtPortStatus = (shipment) => {
  if (!shipment ||
      !shipment.movement ||
      !shipment.movement.pickupAtPortStatus) {
    return '';
  }
  if (shipment.movement.pickupAtPortStatus === 'Expected') {
    return 'Est. Pickup';
  }
  return 'Picked Up';
};

const displayPickupAtPortDate = (shipment) => {
  if (!shipment || !shipment.movement || !shipment.movement.pickupAtPortDate) {
    return '';
  }
  return moment(shipment.movement.pickupAtPortDate).format('D MMM, YYYY');
};

const isDelivered = (shipment) => {
  if (!shipment || !shipment.movement || !shipment.movement.deliveryStatus) {
    return false;
  }
  return shipment.movement.deliveryStatus === 'Actual';
};

const Shipment = {
  save,
  archive,
  confirm,
  movementStatus,
  route,
  isInactive,
  mode,
  originCountryCode,
  originCountry,
  destinationCountryCode,
  destinationCountry,
  displayStatus,
  cargoString,
  displayDate,
  displayDateLabel,
  isReceived,
  displayReceiptLocation,
  displayCargoReadyStatus,
  displayCargoReadyDate,
  displayReceiptStatus,
  displayReceiptDate,
  isDeliveredAtPort,
  displayDeliveryAtPortStatus,
  displayDeliveryAtPortDate,
  isDeparted,
  displayDeparture,
  displayDepartureStatus,
  displayDepartureDate,
  isArrived,
  displayArrival,
  displayArrivalStatus,
  displayArrivalDate,
  isPickedUpAtPort,
  displayPickupAtPortStatus,
  displayPickupAtPortDate,
  isDelivered,
  displayDelivery,
  displayDeliveryStatus,
  displayDeliveryDate,
};

export default Shipment;
