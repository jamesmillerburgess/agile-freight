import { Meteor } from 'meteor/meteor';
import { uniqueValues } from '../ui/statsUtils';
import { APIGlobals } from '../api/api-globals';

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
