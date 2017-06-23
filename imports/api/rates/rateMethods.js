import { Meteor } from 'meteor/meteor';
import { check, Match } from 'meteor/check';
import { Rates } from './rateCollection';

Meteor.methods({
  'rates.getApplicableSellRates': function customerNewMethod(options = {}) {
    check(options, Object);
    check(options.chargeCode, String);
    check(options.movement, Match.Maybe(Object));

    const { chargeCode, movement } = options;
    let countryRoute = '';
    let locationRoute = '';
    let supplierRoute = '';
    if (movement && movement.route && movement.route.length > 0) {
      countryRoute = movement.route.reduce(
        (acc, component) => acc + component.slice(0, 2), '',
      );
      locationRoute = movement.route.join('');
      if (movement.supplier && movement.supplier.length > 0) {
        supplierRoute = movement.supplier + locationRoute;
      }
    }
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
      supplier: Rates.findOne({
        type: 'sell',
        chargeCode,
        level: 'supplier',
        route: supplierRoute,
      }),
    };
    if (rates.supplier) {
      rates.suggested = 'supplier';
    } else if (rates.location) {
      rates.suggested = 'location';
    } else if (rates.country) {
      rates.suggested = 'country';
    } else if (rates.global) {
      rates.suggested = 'global';
    } else {
      rates.suggested = 'custom';
    }
    return rates;
  },
});
