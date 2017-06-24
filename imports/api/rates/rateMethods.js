import { Meteor } from 'meteor/meteor';
import { check, Match } from 'meteor/check';
import { Rates } from './rateCollection';

/**
 * Build the country route out of the first two characters of the respective
 * location codes in the movement.
 * @param route
 * @param movement
 */
export const getCountryRoute = (route = [], movement = {}) => route.reduce(
  (acc, component) => acc + (movement[component] || '').slice(0, 2), '',
);

/**
 * Build the locaiton route from the respective location codes in the movement.
 * @param route
 * @param movement
 */
export const getLocationRoute = (route = [], movement = {}) => route.reduce(
  (acc, component) => acc + (movement[component] || ''), '',
);

/**
 * Build the carrier route from the carrier and the location codes in the
 * movement.
 * @param route
 * @param movement
 */
export const getcarrierRoute = (route = [], movement = {}) => (
  movement.carrier + route.reduce(
    (acc, component) => acc + (movement[component] || ''), '',
  )
);

/**
 * Gets the applicable sell rate from each level and returns it as an object
 * together with the suggested rate. The suggested rate is always the most
 * specific rate applicable.
 * @param charge
 * @param movement
 * @returns {{global: (Promise|any), country: (Promise|any), location:
 *   (Promise|any), carrier: (Promise|any)}}
 */
const getApplicableSellRates = (charge, movement) => {
  const { chargeCode, route } = charge;
  const countryRoute = getCountryRoute(route, movement);
  const locationRoute = getLocationRoute(route, movement);
  const carrierRoute = getcarrierRoute(route, movement);
  const rates = {
    global: Rates.findOne({
      type: 'sell',
      chargeCode,
      level: 'global',
    }),
    country: Rates.findOne({
      type: 'sell',
      chargeCode,
      level: 'country',
      route: countryRoute,
    }),
    location: Rates.findOne({
      type: 'sell',
      chargeCode,
      level: 'location',
      route: locationRoute,
    }),
    carrier: Rates.findOne({
      type: 'sell',
      chargeCode,
      level: 'carrier',
      route: carrierRoute,
    }),
  };
  if (rates.carrier) {
    rates.suggested = 'carrier';
  } else if (rates.location) {
    rates.suggested = 'location';
  } else if (rates.country) {
    rates.suggested = 'country';
  } else if (rates.global) {
    rates.suggested = 'global';
  }
  return rates;
};

/**
 * Iterates over all charges and gets the applicable sell rates for each.
 * @param charges
 * @param movement
 */
export const getAllApplicableSellRates = (charges = [], movement) => {
  check(charges, Array);
  check(movement, Match.Maybe(Object));
  return charges.map(charge => getApplicableSellRates(charge, movement));
};

export const rateSchema = {
  type: String,
  chargeCode: String,
  level: String,
  route: Match.Maybe(String),
  basis: String,
  unitPrice: Number,
  currency: String,
};

/**
 * Inserts a new rate into the collection.
 * @param rate
 */
export const newRate = (rate) => {
  check(rate, rateSchema);
  return Rates.insert(rate);
};

/**
 * Saves changes to an existing rate.
 * @param rateId
 * @param rate
 */
export const saveRate = (rateId, rate) => {
  check(rateId, String);
  check(rate, rateSchema);
  Rates.update({ _id: rateId }, rate);
};

Meteor.methods({
  'rates.getApplicableSellRates': getAllApplicableSellRates,
  'rates.new': newRate,
  'rates.save': saveRate,
});
