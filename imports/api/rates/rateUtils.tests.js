/* eslint-env mocha */
/* eslint-disable func-names, prefer-arrow-callback */

import { chai } from 'meteor/practicalmeteor:chai';
import { Meteor } from 'meteor/meteor';

import Rate from './rateUtils';

chai.should();

if (Meteor.isClient) {
  describe('Rate Utilities', () => {
    describe('Rate.getBasis', () => {
      it('returns the cargo type any basis when the rate is not split by ' +
         'cargo type', () => {
        const rate = { isSplitByCargoType: false, anyBasis: 'Shipment' };
        Rate.getBasis(rate).should.equal('Shipment');
      });
      it('returns the containerized basis when the rate is split by cargo ' +
         'type and the cargo type is containerized', () => {
        const rate = { isSplitByCargoType: true, containerizedBasis: 'TEU' };
        const cargo = { cargoType: 'Containerized' };
        Rate.getBasis(rate, cargo).should.equal('TEU');
      });
      it('returns the loose basis when the rate is split by cargo type and ' +
         'the cargo type is loose', () => {
        const rate = { isSplitByCargoType: true, looseBasis: 'KG' };
        const cargo = { cargoType: 'Loose' };
        Rate.getBasis(rate, cargo).should.equal('KG');
      });
      it('returns null if the rate is split by cargo type and the cargo type ' +
         'is neither loose nor containerized', () => {
        const rate = { isSplitByCargoType: true };
        const cargo = { cargoType: 'xxx' };
        (Rate.getBasis(rate, cargo) === null).should.equal(true);
      });
    });
    describe('Rate.getApplicableRange', () => {
      it('returns the range with the lowest maximum units that is still ' +
         'higher than the units provided', () => {
        const ranges = {
          a: { maximumUnits: 10, unitPrice: 10 },
          b: { maximumUnits: 20, unitPrice: 20 },
          c: { maximumUnits: 30, unitPrice: 30 },
        };
        Rate.getApplicableRange(ranges, 15)
            .should
            .eql({ maximumUnits: 20, unitPrice: 20 });
      });
      it('returns null if no ranges have maximum units higher than the units' +
         'provided', () => {
        const ranges = {
          a: { maximumUnits: 10, unitPrice: 10 },
        };
        (Rate.getApplicableRange(ranges, 15) === null).should.equal(true);
      });
      it('returns the range with no maximum if the other ranges all have ' +
         'maximum units lower than the units provided', () => {
        const ranges = {
          a: { maximumUnits: 10, unitPrice: 10 },
          b: { maximumUnits: NaN, unitPrice: 20 },
        };
        Rate.getApplicableRange(ranges, 15)
            .should
            .eql({ maximumUnits: NaN, unitPrice: 20 });
      });
    });
    describe('Rate.getRanges', () => {
      it('returns any cargo type ranges when the rate is not split by cargo ' +
         'type', () => {
        const rate = {
          isSplitByCargoType: false,
          anyRanges: ['a'],
          ranges: { a: {}, b: {} },
        };
        Rate.getRanges(rate).should.eql({ a: {} });
      });
      it('returns loose cargo type ranges when the rate is split by cargo ' +
         'type and the cargo type is loose', () => {
        const rate = {
          isSplitByCargoType: true,
          looseRanges: ['a'],
          ranges: { a: {}, b: {} },
        };
        const cargo = { cargoType: 'Loose' };
        Rate.getRanges(rate, cargo).should.eql({ a: {} });
      });
      it('returns containerized cargo type ranges when the rate is split by ' +
         'cargo type and the cargo type is containerized', () => {
        const rate = {
          isSplitByCargoType: true,
          containerizedRanges: ['a'],
          ranges: { a: {}, b: {} },
        };
        const cargo = { cargoType: 'Containerized' };
        Rate.getRanges(rate, cargo).should.eql({ a: {} });
      });
      it('returns null if the rate is split by cargo type and the cargo type ' +
         'is neither loose nor containerized', () => {
        
      });
    });
  });
}
