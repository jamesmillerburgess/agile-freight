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
 *
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

export const newRate = (rate) => {
  check(rate, {
    type: String,
    chargeCode: String,
    level: String,
    route: Match.Maybe(String),
    basis: String,
    unitPrice: Number,
    currency: String,
  });
  return Rates.insert(rate);
};

export const saveRate = (rateId, rate) => {
  Rates.update({ _id: rateId }, rate);
};

Meteor.methods({
  'rates.getApplicableSellRates': (charges = [], movement = {}) => {
    check(charges, Array);
    check(movement, Match.Maybe(Object));
    return charges.map(charge => getApplicableSellRates(charge, movement));
  },
  'rates.new': newRate,
  'rates.save': saveRate,
});
