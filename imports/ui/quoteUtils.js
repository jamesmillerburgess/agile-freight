import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { uniqueValues } from '../ui/statsUtils';
import { APIGlobals } from '../api/api-globals';

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
  const result = charges.fxConversions;
  const currencies = uniqueValues(charges.chargeLines, 'currency');
  currencies.forEach((currency) => {
    if (currency === charges.currency) {
      if (result[currency]) {
        result[currency].active = false;
      }
    } else if (!result[currency]) {
      result[currency] = { active: true };
    } else if (!result[currency].active) {
      result[currency].active = true;
    }
  });
  Object.keys(result).forEach((currency) => {
    if (currencies.indexOf(currency) === -1) {
      result[currency].active = false;
    }
    if (result[currency].active && !result[currency].rate) {
      result[currency].rate = APIGlobals.fxRates[charges.currency][currency];
    }
  });
  return result;
};

export const copyQuote = (quoteId, cb) => {
  Meteor.call('quote.copy', quoteId, cb);
};
