import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { createSelector } from 'reselect';
import { set } from 'lodash/fp';

import { uniqueValues } from '../ui/statsUtils';
import { APIGlobals } from '../api/api-globals';
import {
  getDefaultMovementCharges,
  getDefaultOtherServicesCharges,
} from '../api/rates/chargeDefaultUtils';
import Rate from '../api/rates/rateUtils';

const getTotalVolume = state => state.quote.cargo.totalVolume;
const getTotalWeight = state => state.quote.cargo.totalWeight;
const getDensityRatio = state => state.quote.cargo.densityRatio;
export const getChargeableWeight = createSelector(
  getTotalVolume,
  getTotalWeight,
  getDensityRatio,
  (totalVolume, totalWeight, densityRatio) => {
    if (totalVolume * densityRatio > totalWeight) {
      return totalVolume * densityRatio;
    }
    return totalWeight;
  },
);

/**
 * Defaults the units of a charge line based on the cargo properties.
 * @param basis
 * @param cargo
 * @returns {number}
 */
export const defaultUnits = (basis, cargo) => {
  switch (basis) {
    case 'Shipment':
      return 1;
    case 'KG':
      return cargo.totalWeight;
    case 'CBM':
      return cargo.totalVolume;
    case 'Container':
      return cargo.totalContainers;
    case 'TEU':
      return cargo.totalTEU;
    case 'Package':
      return cargo.totalPackages;
    case 'Weight Measure':
      return cargo.chargeableWeight;
    default:
      return 1;
  }
};

/**
 * Builds a new charge line for the specified group based on quote properties.
 * @param group
 * @param quote
 */
export const newChargeLine = (group, quote) => ({
  id: new Mongo.ObjectID()._str,
  group,
  basis: 'Shipment',
  units: defaultUnits('Shipment', quote.cargo),
  currency: quote.charges.currency,
  applicableSellRates: {},
  selectedRate: 'custom',
});

/**
 * Reads through the charges object and determines if conversions need to be
 * activated/deactivated and default in the exchange rates.
 * @param charges
 * @returns {charges.fxConversions|{AED, ALL}}
 */
export const getUpdatedFXConversions = (charges) => {
  let result = Object.assign({}, charges.fxConversions || {});
  const currencies = uniqueValues(charges.chargeLines, 'currency');
  currencies.forEach((currency) => {
    if (currency === charges.currency) {
      if (result[currency]) {
        result[currency] = set('active', false, result[currency]);
      }
    } else if (!result[currency]) {
      result = set(currency, { active: true }, result);
    } else if (!result[currency].active) {
      result[currency] = set('active', true, result[currency]);
    }
  });
  Object.keys(result).forEach((currency) => {
    if (currencies.indexOf(currency) === -1) {
      result[currency] = set('active', false, result[currency]);
    }
    if (result[currency].active && !result[currency].rate) {
      result[currency] = set(
        'rate',
        APIGlobals.fxRates[charges.currency][currency],
        result[currency],
      );
    }
  });
  return result;
};

export const copyQuote = (quoteId, cb) => {
  Meteor.call('quote.copy', quoteId, cb);
};

export const newShipment = (quoteId, cb) => {
  Meteor.call('shipment.new', quoteId, cb);
};

export const extractRateMovement = quote => ({
  carrier: quote.movement.carrier,
  receipt: quote.movement.receipt.code,
  departure: quote.movement.departure.code,
  arrival: quote.movement.arrival.code,
  delivery: quote.movement.delivery.code,
});

export const getChargeLines = quote => ([
  ...getDefaultMovementCharges(quote.movement),
  ...getDefaultOtherServicesCharges(quote.otherServices),
]);

export const getRates = (quote, cb) => {
  const movement = extractRateMovement(quote);
  const { cargo } = quote;
  const chargeLines = quote.charges.chargeLines;
  Meteor.call('rates.getApplicableSellRates', chargeLines, movement, cargo, cb);
};

export const applyRates = (quote, rates) => {
  const chargeLines = rates.map((rateGroups, index) => {
    let sellRate = {};
    let selectedRate = rateGroups.suggested;
    const applicableSellRates = { ...rateGroups };
    Object.keys(applicableSellRates).forEach((key) => {
      if (key !== 'suggested') {
        applicableSellRates[key] = {
          ...applicableSellRates[key],
          ...Rate.getChargeFromRate(applicableSellRates[key], quote.cargo),
        };
      }
    });
    if (selectedRate) {
      sellRate = Rate.getChargeFromRate(
        rateGroups[selectedRate],
        quote.cargo,
      );
    } else {
      sellRate.basis = 'Shipment';
      sellRate.units = 1;
      sellRate.currency = quote.charges.currency;
      selectedRate = 'custom';
    }
    return {
      id: new Mongo.ObjectID()._str,
      ...quote.charges.chargeLines[index],
      ...sellRate,
      applicableSellRates,
      selectedRate,
    };
  });
  const charges = {
    ...quote.charges,
    chargeLines,
    notes: APIGlobals.notes,
  };
  charges.fxConversions = getUpdatedFXConversions(charges);
  return {
    ...quote,
    charges,
  };
};

const getAndApplyRates = (quote, cb) => {
  const chargeLines = getChargeLines(quote);
  let updatedQuote = { ...quote };
  updatedQuote.charges.chargeLines = chargeLines;
  getRates(updatedQuote, (err, rates) => {
    updatedQuote = applyRates(updatedQuote, rates);
    cb(updatedQuote);
  });
};

const Quote = {
  getRates,
  getAndApplyRates,
};

export default Quote;
