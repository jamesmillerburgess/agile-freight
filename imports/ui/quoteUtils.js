import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { createSelector } from 'reselect';
import { uniqueValues } from '../ui/statsUtils';
import { setProp } from '../state/reducers/reducer-utils';
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
        result[currency] = setProp(result[currency], 'active', false);
      }
    } else if (!result[currency]) {
      result = setProp(result, currency, { active: true });
    } else if (!result[currency].active) {
      result[currency] = setProp(result[currency], 'active', true);
    }
  });
  Object.keys(result).forEach((currency) => {
    if (currencies.indexOf(currency) === -1) {
      result[currency] = setProp(result[currency], 'active', false);
    }
    if (result[currency].active && !result[currency].rate) {
      result[currency] = setProp(
        result[currency],
        'rate',
        APIGlobals.fxRates[charges.currency][currency],
      );
    }
  });
  return result;
};

export const copyQuote = (quoteId, cb) => {
  Meteor.call('quote.copy', quoteId, cb);
};

export const extractRateMovement = quote => ({
  carrier: quote.movement.carrier,
  receipt: quote.movement.receipt.code,
  departure: quote.movement.departure.code,
  arrival: quote.movement.arrival.code,
  delivery: quote.movement.delivery.code,
});

export const getCharges = quote => ([
  ...getDefaultMovementCharges(quote.movement),
  ...getDefaultOtherServicesCharges(quote.otherServices),
]);

export const getRates = (quote, cb) => {
  const movement = extractRateMovement(quote);
  const charges = getCharges(quote);
  const cargo = quote.cargo;
  Meteor.call('rates.getApplicableSellRates', charges, movement, cargo, cb);
};

export const applyRates = (quote, rates) => {
  const chargeLines = rates.map((applicableSellRates, index) => {
    let sellRate = {};
    let selectedRate = '';
    if (applicableSellRates.suggested) {
      sellRate = Rate.getChargeFromRate(
        applicableSellRates[applicableSellRates.suggested],
        quote.cargo,
      );
      selectedRate = applicableSellRates.suggested;
    } else {
      sellRate.basis = 'Shipment';
      sellRate.units = 1;
      sellRate.currency = quote.charges.currency;
      selectedRate = 'custom';
    }
    return {
      id: new Mongo.ObjectID()._str,
      ...quote.charges[index],
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
  getRates(quote, (err, rates) => {
    const newQuote = applyRates(quote, rates);
    cb(newQuote);
  });
};

const Quote = {
  getRates,
  getAndApplyRates,
};

export default Quote;
