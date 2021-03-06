/* eslint-env mocha */
/* eslint-disable func-names, prefer-arrow-callback */

import { chai } from 'meteor/practicalmeteor:chai';
import { Meteor } from 'meteor/meteor';

import * as chargeDefaultUtils from './chargeDefaultUtils';
import { APIGlobals } from '../api-globals';

chai.should();

if (Meteor.isClient) {
  describe('Charge Default Utilities', () => {
    describe('hasCollection function', () => {
      const { hasCollection } = chargeDefaultUtils;

      it('returns true when Seller, CIF, receipt', () => {
        const movement = {
          commercialParty: 'Seller',
          termsOfSale: 'CIF',
          receipt: { _id: 'a' },
        };
        hasCollection(movement).should.equal(true);
      });

      it('returns false when Seller, CIF, no receipt', () => {
        const movement = {
          commercialParty: 'Seller',
          termsOfSale: 'CIF',
          receipt: {},
        };
        hasCollection(movement).should.equal(false);
      });

      it('returns false when Seller, EXW, has receipt', () => {
        const movement = {
          commercialParty: 'Seller',
          termsOfSale: 'EXW',
          receipt: { _id: 'a' },
        };
        hasCollection(movement).should.equal(false);
      });

      it('returns true when Buyer, EXW, has receipt', () => {
        const movement = {
          commercialParty: 'Buyer',
          termsOfSale: 'EXW',
          receipt: { _id: 'a' },
        };
        hasCollection(movement).should.equal(true);
      });

      it('returns false when Buyer, EXW, no receipt', () => {
        const movement = {
          commercialParty: 'Buyer',
          termsOfSale: 'EXW',
          receipt: {},
        };
        hasCollection(movement).should.equal(false);
      });

      it('returns false when Buyer, EXW, no receipt', () => {
        const movement = {
          commercialParty: 'Buyer',
          termsOfSale: 'EXW',
          receipt: {},
        };
        hasCollection(movement).should.equal(false);
      });

      it('returns false when Buyer, CIF, has receipt', () => {
        const movement = {
          commercialParty: 'Buyer',
          termsOfSale: 'CIF',
          receipt: { _id: 'a' },
        };
        hasCollection(movement).should.equal(false);
      });

      it('returns false when Brokerage', () => {
        const movement = {
          mode: 'Brokerage',
          commercialParty: 'Seller',
          termsOfSale: 'CIF',
          receipt: { _id: 'a' },
        };
        hasCollection(movement).should.equal(false);
      });
    });

    describe('hasDelivery function', () => {
      const { hasDelivery } = chargeDefaultUtils;

      it('returns true if Seller, DAP, has delivery', () => {
        const movement = {
          commercialParty: 'Seller',
          termsOfSale: 'DAP',
          delivery: { _id: 'a' },
        };
        hasDelivery(movement).should.equal(true);
      });

      it('returns false if Seller, DAP, no delivery', () => {
        const movement = {
          commercialParty: 'Seller',
          termsOfSale: 'DAP',
          delivery: {},
        };
        hasDelivery(movement).should.equal(false);
      });

      it('returns false if Seller, CFR, has delivery', () => {
        const movement = {
          commercialParty: 'Seller',
          termsOfSale: 'CFR',
          delivery: { _id: 'a' },
        };
        hasDelivery(movement).should.equal(false);
      });

      it('returns true when Buyer, CFR, has delivery', () => {
        const movement = {
          commercialParty: 'Buyer',
          termsOfSale: 'CFR',
          delivery: { _id: 'a' },
        };
        hasDelivery(movement).should.equal(true);
      });

      it('returns false when Buyer, CFR, no delivery', () => {
        const movement = {
          commercialParty: 'Buyer',
          termsOfSale: 'CFR',
          delivery: {},
        };
        hasDelivery(movement).should.equal(false);
      });

      it('returns false when Buyer, DAP, has delivery', () => {
        const movement = {
          commercialParty: 'Buyer',
          termsOfSale: 'DAP',
          delivery: { _2id: 'a' },
        };
        hasDelivery(movement).should.equal(false);
      });

      it('returns false when Brokerage', () => {
        const movement = {
          mode: 'Brokerage',
          commercialParty: 'Buyer',
          termsOfSale: 'CFR',
          delivery: { _id: 'a' },
        };
        hasDelivery(movement).should.equal(false);
      });
    });

    describe('hasInternationalFreight function', () => {
      const { hasInternationalFreight } = chargeDefaultUtils;
      it('returns true when Seller, CFR', () => {
        const movement = {
          commercialParty: 'Seller',
          termsOfSale: 'CFR',
        };
        hasInternationalFreight(movement).should.equal(true);
      });

      it('returns false when Seller, EXW', () => {
        const movement = {
          commercialParty: 'Seller',
          termsOfSale: 'EXW',
        };
        hasInternationalFreight(movement).should.equal(false);
      });

      it('returns true when Buyer, EXW', () => {
        const movement = {
          commercialParty: 'Buyer',
          termsOfSale: 'EXW',
        };
        hasInternationalFreight(movement).should.equal(true);
      });

      it('returns false when Buyer, CFR', () => {
        const movement = {
          commercialParty: 'Buyer',
          termsOfSale: 'CFR',
        };
        hasInternationalFreight(movement).should.equal(false);
      });

      it('returns false when Brokerage', () => {
        const movement = {
          mode: 'Brokerage',
          commercialParty: 'Seller',
          termsOfSale: 'CFR',
        };
        hasInternationalFreight(movement).should.equal(false);
      });
    });

    describe('getDefaultMovementCharges function', () => {
      const { getDefaultMovementCharges } = chargeDefaultUtils;
      it('returns collection charges when Seller, FOB, has receipt, no ' +
         'delivery', () => {
        const movement = {
          commercialParty: 'Seller',
          termsOfSale: 'FOB',
          receipt: { _id: 'a' },
          delivery: {},
        };
        getDefaultMovementCharges(movement)
          .should
          .eql(APIGlobals.defaultCollectionCharges);
      });

      it('returns delivery charges when Buyer, CFR, no receipt, has ' +
         'delivery', () => {
        const movement = {
          commercialParty: 'Buyer',
          termsOfSale: 'CFR',
          receipt: {},
          delivery: { _id: 'a' },
        };
        getDefaultMovementCharges(movement)
          .should
          .eql(APIGlobals.defaultDeliveryCharges);
      });

      it('returns international freight charges when Seller, CFR,' +
         ' no receipt, has delivery', () => {
        const movement = {
          commercialParty: 'Seller',
          termsOfSale: 'CFR',
          receipt: {},
          delivery: { _id: 'a' },
        };
        getDefaultMovementCharges(movement)
          .should
          .eql(APIGlobals.defaultInternationalFreightCharges);
      });

      it('returns collection and international freight charges when Seller, ' +
         'CFR, has receipt, has delivery', () => {
        const movement = {
          commercialParty: 'Seller',
          termsOfSale: 'CFR',
          receipt: { _id: 'a' },
          delivery: { _id: 'a' },
        };
        getDefaultMovementCharges(movement)
          .should
          .eql([
            ...APIGlobals.defaultCollectionCharges,
            ...APIGlobals.defaultInternationalFreightCharges,
          ]);
      });

      it('returns international freight and delivery charges when Buyer, ' +
         'FOB, has receipt, has delivery', () => {
        const movement = {
          commercialParty: 'Buyer',
          termsOfSale: 'FOB',
          receipt: { _id: 'a' },
          delivery: { _id: 'a' },
        };
        getDefaultMovementCharges(movement)
          .should
          .eql([
            ...APIGlobals.defaultInternationalFreightCharges,
            ...APIGlobals.defaultDeliveryCharges,
          ]);
      });

      it('returns collection, international freight, and delivery charges ' +
         'when Buyer, EXW, has receipt, has delivery', () => {
        const movement = {
          commercialParty: 'Buyer',
          termsOfSale: 'EXW',
          receipt: { _id: 'a' },
          delivery: { _id: 'a' },
        };
        getDefaultMovementCharges(movement)
          .should
          .eql([
            ...APIGlobals.defaultCollectionCharges,
            ...APIGlobals.defaultInternationalFreightCharges,
            ...APIGlobals.defaultDeliveryCharges,
          ]);
      });
    });

    describe('getDefaultOtherServicesCharges function', () => {
      const { getDefaultOtherServicesCharges } = chargeDefaultUtils;
      it('returns import customs clearance charges if import customs ' +
         'clearance is true', () => {
        const otherServices = { importCustomsClearance: true };
        getDefaultOtherServicesCharges(otherServices)
          .should
          .eql(APIGlobals.defaultImportClearanceCharges);
      });
    });

    describe('hasApplicableRoute function', () => {
      const { hasApplicableRoute } = chargeDefaultUtils;
      it('returns true if all components are present in movement', () => {
        const route = ['receipt', 'departure'];
        const movement = { receipt: 'INBOM', departure: 'GBFXT' };
        hasApplicableRoute(route, movement).should.equal(true);
      });

      it('returns false if some components are not present in movement', () => {
        const route = ['receipt', 'departure'];
        const movement = { departure: 'GBFXT' };
        hasApplicableRoute(route, movement).should.equal(false);
      });

      it('handles an undefined movement', () => {
        const route = ['receipt'];
        hasApplicableRoute(route).should.equal(false);
      });
    });

    describe('getApplicableSellRates function', () => {
      const { getApplicableSellRates } = chargeDefaultUtils;
      it('returns an empty object if there are no applicable rates', () => {
        const charge = {
          name: 'Delivery',
          group: 'Destination',
          chargeCode: 'DEL',
          route: ['arrival', 'delivery'],
        };
        const sellRates = {
          COL: {
            global: {
              rate: 'Mile',
              unitPrice: 0.5,
              currency: 'USD',
            },
          },
        };
        getApplicableSellRates(charge, sellRates).should.eql({});
      });

      it('returns the global rate if it the only rate applicable', () => {
        const charge = {
          name: 'Collection',
          group: 'Origin',
          chargeCode: 'COL',
          route: ['receipt', 'departure'],
        };
        const globalRate = {
          rate: 'Mile',
          unitPrice: 0.5,
          currency: 'USD',
        };
        const sellRates = { COL: { global: globalRate } };
        const applicableSellRates = getApplicableSellRates(charge, sellRates);
        applicableSellRates.global.should.equal(globalRate);
        applicableSellRates.suggested.should.equal('global');
      });

      it('returns the country rate if it is the only rate applicable', () => {
        const charge = {
          name: 'Collection',
          group: 'Origin',
          chargeCode: 'COL',
          route: ['receipt', 'departure'],
        };
        const countryRate = {
          rate: 'Mile',
          unitPrice: 0.5,
          currency: 'USD',
        };
        const movement = {
          receipt: 'USMIA',
          departure: 'USTPA',
        };
        const sellRates = { COL: { country: { USUS: countryRate } } };
        const applicableSellRates = getApplicableSellRates(
          charge,
          sellRates,
          movement,
        );
        applicableSellRates.country.should.equal(countryRate);
        applicableSellRates.suggested.should.equal('country');
      });

      it('suggests the country rate and returns both rates if both a country ' +
         'and global rate are applicable', () => {
        const charge = {
          name: 'Collection',
          group: 'Origin',
          chargeCode: 'COL',
          route: ['receipt', 'departure'],
        };
        const globalRate = {
          rate: 'Mile',
          unitPrice: 1,
          currency: 'USD',
        };
        const countryRate = {
          rate: 'Mile',
          unitPrice: 0.5,
          currency: 'USD',
        };
        const movement = {
          receipt: 'USMIA',
          departure: 'USTPA',
        };
        const sellRates = {
          COL: {
            global: globalRate,
            country: { USUS: countryRate },
          },
        };
        const applicableSellRates = getApplicableSellRates(
          charge,
          sellRates,
          movement,
        );
        applicableSellRates.global.should.equal(globalRate);
        applicableSellRates.country.should.equal(countryRate);
        applicableSellRates.suggested.should.equal('country');
      });

      it('returns the location rate if it is the only rate applicable', () => {
        const charge = {
          name: 'Collection',
          group: 'Origin',
          chargeCode: 'COL',
          route: ['receipt', 'departure'],
        };
        const locationRate = {
          rate: 'Mile',
          unitPrice: 0.5,
          currency: 'USD',
        };
        const movement = {
          receipt: 'USMIA',
          departure: 'USTPA',
        };
        const sellRates = { COL: { location: { USMIAUSTPA: locationRate } } };
        const applicableSellRates = getApplicableSellRates(
          charge,
          sellRates,
          movement,
        );
        applicableSellRates.location.should.equal(locationRate);
        applicableSellRates.suggested.should.equal('location');
      });

      it('suggests the location rate and returns all three if location, ' +
         'country, and global rates are applicable', () => {
        const charge = {
          name: 'Collection',
          group: 'Origin',
          chargeCode: 'COL',
          route: ['receipt', 'departure'],
        };
        const globalRate = {
          rate: 'Mile',
          unitPrice: 1,
          currency: 'USD',
        };
        const countryRate = {
          rate: 'Mile',
          unitPrice: 0.75,
          currency: 'USD',
        };
        const locationRate = {
          rate: 'Mile',
          unitPrice: 0.5,
          currency: 'USD',
        };
        const movement = {
          receipt: 'USMIA',
          departure: 'USTPA',
        };
        const sellRates = {
          COL: {
            global: globalRate,
            country: { USUS: countryRate },
            location: { USMIAUSTPA: locationRate },
          },
        };
        const applicableSellRates = getApplicableSellRates(
          charge,
          sellRates,
          movement,
        );
        applicableSellRates.location.should.equal(locationRate);
        applicableSellRates.country.should.equal(countryRate);
        applicableSellRates.global.should.equal(globalRate);
        applicableSellRates.suggested.should.equal('location');
      });

      it('suggests the carrier rate if it is the only rate applicable', () => {
        const charge = {
          name: 'Collection',
          group: 'Origin',
          chargeCode: 'COL',
          route: ['receipt', 'departure'],
        };
        const carrierRate = {
          rate: 'Mile',
          unitPrice: 0.5,
          currency: 'USD',
        };
        const movement = {
          carrier: 'MAEU',
          receipt: 'USMIA',
          departure: 'USTPA',
        };
        const sellRates = { COL: { carrier: { MAEUUSMIAUSTPA: carrierRate } } };
        const applicableSellRates = getApplicableSellRates(
          charge,
          sellRates,
          movement,
        );
        applicableSellRates.carrier.should.equal(carrierRate);
        applicableSellRates.suggested.should.equal('carrier');
      });

      it('suggests the carrier rate and returns all four if carrier, ' +
         'location, country, and global rates are applicable', () => {
        const charge = {
          name: 'Collection',
          group: 'Origin',
          chargeCode: 'COL',
          route: ['receipt', 'departure'],
        };
        const globalRate = {
          rate: 'Mile',
          unitPrice: 1,
          currency: 'USD',
        };
        const countryRate = {
          rate: 'Mile',
          unitPrice: 0.75,
          currency: 'USD',
        };
        const locationRate = {
          rate: 'Mile',
          unitPrice: 0.5,
          currency: 'USD',
        };
        const carrierRate = {
          rate: 'Mile',
          unitPrice: 0.25,
          currency: 'USD',
        };
        const movement = {
          carrier: 'MAEU',
          receipt: 'USMIA',
          departure: 'USTPA',
        };
        const sellRates = {
          COL: {
            global: globalRate,
            country: { USUS: countryRate },
            location: { USMIAUSTPA: locationRate },
            carrier: { MAEUUSMIAUSTPA: carrierRate },
          },
        };
        const applicableSellRates = getApplicableSellRates(
          charge,
          sellRates,
          movement,
        );
        applicableSellRates.carrier.should.equal(carrierRate);
        applicableSellRates.location.should.equal(locationRate);
        applicableSellRates.country.should.equal(countryRate);
        applicableSellRates.global.should.equal(globalRate);
        applicableSellRates.suggested.should.equal('carrier');
      });
    });
  });
}
