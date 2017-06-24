/* eslint-env mocha */
/* eslint-disable func-names, prefer-arrow-callback */

import { chai } from 'meteor/practicalmeteor:chai';
import { Meteor } from 'meteor/meteor';

import { Rates } from './rateCollection';

import './rateMethods';

chai.should();

if (Meteor.isServer) {
  describe('Rate Methods', () => {
    beforeEach(() => {
      Rates.remove({});
    });

    describe('rates.getApplicableSellRates', () => {
      it('returns rates matching the specified options', () => {
        const rate = {
          _id: 'a',
          type: 'sell',
          chargeCode: 'ITP',
          level: 'global',
          rate: {
            basis: 'Mile',
            unitPrice: 0.5,
            currency: 'USD',
          },
        };
        const charges = [
          {
            name: 'Inland Transport',
            group: 'Origin',
            chargeCode: 'ITP',
            route: ['receipt', 'departure'],
          },
        ];
        Rates.insert(rate);
        const result = Meteor.call('rates.getApplicableSellRates', charges);
        result.length
              .should
              .equal(1);
        result[0].global
                 .should
                 .eql(rate);
        result[0].suggested
                 .should
                 .equal('global');
      });

      it('does not return rates that do not match the specified ' +
         'options', () => {
        const rate = {
          _id: 'a',
          type: 'sell',
          chargeCode: 'ITP',
          level: 'global',
          rate: {
            basis: 'Mile',
            unitPrice: 0.5,
            currency: 'USD',
          },
        };
        const charges = [
          {
            name: 'Inland Transport',
            group: 'Origin',
            chargeCode: 'COL',
            route: ['receipt', 'departure'],
          },
        ];
        Rates.insert(rate);
        const result = Meteor.call('rates.getApplicableSellRates', charges);
        (typeof result[0].global)
          .should
          .equal('undefined');
      });

      it('returns global results regardless of specified route or ' +
         'carrier', () => {
        const rate = {
          _id: 'a',
          type: 'sell',
          chargeCode: 'ITP',
          level: 'global',
          rate: {
            basis: 'Mile',
            unitPrice: 0.5,
            currency: 'USD',
          },
        };
        const charges = [
          {
            name: 'Inland Transport',
            group: 'Origin',
            chargeCode: 'ITP',
            route: ['receipt', 'departure'],
          },
        ];
        const movement = {
          receipt: 'USMIA',
          departure: 'USTPA',
          arrival: 'CNSHA',
          delivery: 'CNSHA',
        };
        Rates.insert(rate);
        const result = Meteor.call(
          'rates.getApplicableSellRates',
          charges,
          movement,
        );
        result[0].global
                 .should
                 .eql(rate);
        result[0].suggested
                 .should
                 .equal('global');
      });

      it('returns country rates when the country route matches', () => {
        const rate = {
          _id: 'a',
          type: 'sell',
          chargeCode: 'ITP',
          level: 'country',
          route: 'USUS',
          rate: {
            basis: 'Mile',
            unitPrice: 0.5,
            currency: 'USD',
          },
        };
        const charges = [
          {
            name: 'Inland Transport',
            group: 'Origin',
            chargeCode: 'ITP',
            route: ['receipt', 'departure'],
          },
        ];
        const movement = {
          receipt: 'USMIA',
          departure: 'USTPA',
          arrival: 'CNSHA',
          delivery: 'CNSHA',
        };
        Rates.insert(rate);
        const result = Meteor.call(
          'rates.getApplicableSellRates',
          charges,
          movement,
        );
        result[0].country
                 .should
                 .eql(rate);
        result[0].suggested
                 .should
                 .equal('country');
      });

      it('returns location rates when the location route matches', () => {
        const rate = {
          _id: 'a',
          type: 'sell',
          chargeCode: 'ITP',
          level: 'location',
          route: 'USMIAUSTPA',
          rate: {
            basis: 'Mile',
            unitPrice: 0.5,
            currency: 'USD',
          },
        };
        const charges = [
          {
            name: 'Inland Transport',
            group: 'Origin',
            chargeCode: 'ITP',
            route: ['receipt', 'departure'],
          },
        ];
        const movement = {
          receipt: 'USMIA',
          departure: 'USTPA',
          arrival: 'CNSHA',
          delivery: 'CNSHA',
        };
        Rates.insert(rate);
        const result = Meteor.call(
          'rates.getApplicableSellRates',
          charges,
          movement,
        );
        result[0].location
                 .should
                 .eql(rate);
        result[0].suggested
                 .should
                 .equal('location');
      });

      it('returns carrier rates when the carrier route matches', () => {
        const rate = {
          _id: 'a',
          type: 'sell',
          chargeCode: 'ITP',
          level: 'carrier',
          route: 'MAEUUSMIAUSTPA',
          rate: {
            basis: 'Mile',
            unitPrice: 0.5,
            currency: 'USD',
          },
        };
        const charges = [
          {
            name: 'Inland Transport',
            group: 'Origin',
            chargeCode: 'ITP',
            route: ['receipt', 'departure'],
          },
        ];
        const movement = {
          receipt: 'USMIA',
          departure: 'USTPA',
          arrival: 'CNSHA',
          delivery: 'CNSHA',
          carrier: 'MAEU',
        };
        Rates.insert(rate);
        const result = Meteor.call(
          'rates.getApplicableSellRates',
          charges,
          movement,
        );
        result[0].carrier
                 .should
                 .eql(rate);
        result[0].suggested
                 .should
                 .equal('carrier');
      });
    });

    describe('rates.new', () => {
      const rate = {
        type: 'sell',
        chargeCode: 'ITP',
        level: 'country',
        route: 'USUS',
        basis: 'Mile',
        unitPrice: 1,
        currency: 'USD',
      };
      it('inserts a rate into the collection', () => {
        Rates.find().count().should.equal(0);
        Meteor.call('rates.new', rate);
        Rates.find().count().should.equal(1);
      });

      it('returns the id of the new rate', () => {
        const id = Meteor.call('rates.new', rate);
        Rates.findOne(id)._id.should.equal(id);
      });
    });
  });
}
