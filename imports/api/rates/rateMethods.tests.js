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
        Rates.insert(rate);
        const options = { chargeCode: 'ITP' };
        const result = Meteor.call('rates.getApplicableSellRates', options);
        result.global
              .should
              .eql(rate);
        result.suggested
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
        Rates.insert(rate);
        const options = { chargeCode: 'COL' };
        const result = Meteor.call('rates.getApplicableSellRates', options);
        (typeof result.global)
          .should
          .equal('undefined');
      });

      it('suggests custom when no rates are applicable', () => {
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
        Rates.insert(rate);
        const options = { chargeCode: 'COL' };
        const result = Meteor.call('rates.getApplicableSellRates', options);
        result.suggested
              .should
              .equal('custom');
      });

      it('returns global results regardless of specified route or ' +
         'supplier', () => {
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
        Rates.insert(rate);
        const options = {
          chargeCode: 'ITP',
          movement: { route: ['USMIA', 'USTPA'], supplier: 'MAEU' },
        };
        const result = Meteor.call('rates.getApplicableSellRates', options);
        result.global
              .should
              .eql(rate);
        result.suggested
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
        Rates.insert(rate);
        const options = {
          chargeCode: 'ITP',
          movement: { route: ['USMIA', 'USTPA'] },
        };
        const result = Meteor.call('rates.getApplicableSellRates', options);
        result.country
              .should
              .eql(rate);
        result.suggested
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
        Rates.insert(rate);
        const options = {
          chargeCode: 'ITP',
          movement: { route: ['USMIA', 'USTPA'] },
        };
        const result = Meteor.call('rates.getApplicableSellRates', options);
        result.location
              .should
              .eql(rate);
        result.suggested
              .should
              .equal('location');
      });

      it('returns supplier rates when the supplier route matches', () => {
        const rate = {
          _id: 'a',
          type: 'sell',
          chargeCode: 'ITP',
          level: 'supplier',
          route: 'MAEUUSMIAUSTPA',
          rate: {
            basis: 'Mile',
            unitPrice: 0.5,
            currency: 'USD',
          },
        };
        Rates.insert(rate);
        const options = {
          chargeCode: 'ITP',
          movement: { route: ['USMIA', 'USTPA'], supplier: 'MAEU' },
        };
        const result = Meteor.call('rates.getApplicableSellRates', options);
        result.supplier
              .should
              .eql(rate);
        result.suggested
              .should
              .equal('supplier');
      });
    });
  });
}
