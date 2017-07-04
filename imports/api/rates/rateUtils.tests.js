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
        const rate = {
          isSplitByCargoType: true,
          containerizedRanges: ['a'],
          ranges: { a: {}, b: {} },
        };
        const cargo = { cargoType: 'xxx' };
        (Rate.getRanges(rate, cargo) === null).should.equal(true);
      });
    });
    describe('Rate.getUnitPrice', () => {
      it('returns the unit price that applies when the basis is ' +
         'Shipment', () => {
        const rate = {
          isSplitByCargoType: false,
          anyBasis: 'Shipment',
          anyRanges: ['a'],
          ranges: { a: { maximumUnits: NaN, unitPrice: 5 } },
        };
        const cargo = {};
        Rate.getUnitPrice(rate, cargo).should.equal(5);
      });
    });
    describe('Rate.getMinimumAmount', () => {
      it('returns the any cargo type minimum amount when the rate is not ' +
         'split by cargo type', () => {
        const rate = { isSplitByCargoType: false, anyMinimumAmount: 1 };
        Rate.getMinimumAmount(rate).should.equal(1);
      });
      it('returns the loose minimum amount when the rate is split by cargo ' +
         'type and the cargo type is loose', () => {
        const rate = { isSplitByCargoType: true, looseMinimumAmount: 1 };
        const cargo = { cargoType: 'Loose' };
        Rate.getMinimumAmount(rate, cargo).should.equal(1);
      });
      it('returns the containerized minimum amount when the rate is split by ' +
         'cargo type and the cargo type is containerized', () => {
        const rate = {
          isSplitByCargoType: true,
          containerizedMinimumAmount: 1,
        };
        const cargo = { cargoType: 'Containerized' };
        Rate.getMinimumAmount(rate, cargo).should.equal(1);
      });
      it('returns null when the rate is not split by cargo type and the ' +
         'cargo type is invalid', () => {
        const rate = { isSplitByCargoType: true };
        const cargo = { cargoType: 'xxx' };
        (Rate.getMinimumAmount(rate, cargo) === null).should.equal(true);
      });
    });
    describe('Rate.getIsPriceFixed', () => {
      it('returns the any cargo type is price fixed when the rate is not ' +
         'split by cargo type', () => {
        const rate = { isSplitByCargoType: false, isAnyPriceFixed: true };
        Rate.getIsPriceFixed(rate).should.equal(true);
      });
      it('returns the loose is price fixed when the rate is split by cargo ' +
         'type and the cargo type is loose', () => {
        const rate = { isSplitByCargoType: true, isLoosePriceFixed: true };
        const cargo = { cargoType: 'Loose' };
        Rate.getIsPriceFixed(rate, cargo).should.equal(true);
      });
      it('returns the containerized is price fixed when the rate is split by ' +
         'cargo type and the cargo type is containerized', () => {
        const rate = {
          isSplitByCargoType: true,
          isContainerizedPriceFixed: true,
        };
        const cargo = { cargoType: 'Containerized' };
        Rate.getIsPriceFixed(rate, cargo).should.equal(true);
      });
      it('returns null when the rate is not split by cargo type and the ' +
         'cargo type is invalid', () => {
        const rate = { isSplitByCargoType: true };
        const cargo = { cargoType: 'xxx' };
        (Rate.getIsPriceFixed(rate, cargo) === null).should.equal(true);
      });
    });
    describe('Rate.getAmount', () => {
      it('returns the calculated amount when there is no minimum ' +
         'amount and the price is not fixed', () => {
        const rate = {
          isSplitByCargoType: false,
          anyBasis: 'Container',
          anyRanges: ['a'],
          anyMinimumAmount: NaN,
          ranges: { a: { maximumUnits: NaN, unitPrice: 5 } },
        };
        const cargo = { totalContainers: 2 };
        Rate.getAmount(rate, cargo).should.equal(10);
      });
      it('returns the calculated amount when there is no minimum ' +
         'amount and the price is is fixed', () => {
        const rate = {
          isSplitByCargoType: false,
          anyBasis: 'Container',
          anyRanges: ['a'],
          anyMinimumAmount: NaN,
          isAnyPriceFixed: true,
          ranges: { a: { maximumUnits: NaN, unitPrice: 5 } },
        };
        const cargo = { totalContainers: 2 };
        Rate.getAmount(rate, cargo).should.equal(5);
      });
      it('returns the minimum amount when the minimum amount is higher than ' +
         'the calculated amount and the price is not fixed', () => {
        const rate = {
          isSplitByCargoType: false,
          anyBasis: 'Container',
          anyRanges: ['a'],
          anyMinimumAmount: 20,
          isAnyPriceFixed: false,
          ranges: { a: { maximumUnits: NaN, unitPrice: 5 } },
        };
        const cargo = { totalContainers: 2 };
        Rate.getAmount(rate, cargo).should.equal(20);
      });
      it('returns the minimum amount when the minimum amount is higher than ' +
         'the calculated amount and the price is fixed', () => {
        const rate = {
          isSplitByCargoType: false,
          anyBasis: 'Container',
          anyRanges: ['a'],
          anyMinimumAmount: 20,
          isAnyPriceFixed: true,
          ranges: { a: { maximumUnits: NaN, unitPrice: 5 } },
        };
        const cargo = { totalContainers: 2 };
        Rate.getAmount(rate, cargo).should.equal(20);
      });
      it('returns the calculated amount when the calculated amount is higher ' +
         'than the minimum amount and the price is not fixed', () => {
        const rate = {
          isSplitByCargoType: false,
          anyBasis: 'Container',
          anyRanges: ['a'],
          anyMinimumAmount: 1,
          isAnyPriceFixed: false,
          ranges: { a: { maximumUnits: NaN, unitPrice: 5 } },
        };
        const cargo = { totalContainers: 2 };
        Rate.getAmount(rate, cargo).should.equal(10);
      });
      it('returns the calculated amount when the calculated amount is higher ' +
         'than the minimum amount and the price is fixed', () => {
        const rate = {
          isSplitByCargoType: false,
          anyBasis: 'Container',
          anyRanges: ['a'],
          anyMinimumAmount: 1,
          isAnyPriceFixed: true,
          ranges: { a: { maximumUnits: NaN, unitPrice: 5 } },
        };
        const cargo = { totalContainers: 2 };
        Rate.getAmount(rate, cargo).should.equal(5);
      });
    });
    describe('Rate.getChargeFromRate', () => {
      it('returns the relevant basis based on the rate and cargo', () => {
        const rate = {
          anyBasis: 'Shipment',
          isSplitByCargoType: false,
          anyRanges: ['a'],
          ranges: { a: { maximumUnits: NaN, unitPrice: 10 } },
        };
        Rate.getChargeFromRate(rate).basis.should.equal('Shipment');
      });
      it('returns the relevant units based on the rate and cargo', () => {
        const rate = {
          anyBasis: 'Shipment',
          isSplitByCargoType: false,
          anyRanges: ['a'],
          ranges: { a: { maximumUnits: NaN, unitPrice: 10 } },
        };
        Rate.getChargeFromRate(rate).units.should.equal(1);
      });
      it('returns the relevant amount based on the rate and cargo', () => {
        const rate = {
          anyBasis: 'Shipment',
          isSplitByCargoType: false,
          anyRanges: ['a'],
          ranges: { a: { maximumUnits: NaN, unitPrice: 10 } },
        };
        Rate.getChargeFromRate(rate).amount.should.equal(10);
      });
      it('returns the relevant minimum amount based on the rate and ' +
         'cargo', () => {
        const rate = {
          anyBasis: 'Shipment',
          isSplitByCargoType: false,
          anyRanges: ['a'],
          anyMinimumAmount: NaN,
          ranges: { a: { maximumUnits: NaN, unitPrice: 10 } },
        };
        isNaN(Rate.getChargeFromRate(rate).minimumAmount).should.equal(true);
      });
      it('returns the relevant currency based on the rate and cargo', () => {
        const rate = {
          anyBasis: 'Shipment',
          isSplitByCargoType: false,
          anyRanges: ['a'],
          anyMinimumAmount: NaN,
          ranges: { a: { maximumUnits: NaN, unitPrice: 10 } },
          currency: 'GBP',
        };
        Rate.getChargeFromRate(rate).currency.should.equal('GBP');
      });
      it('returns the relevant unit price based on the rate and cargo', () => {
        const rate = {
          anyBasis: 'Shipment',
          isSplitByCargoType: false,
          anyRanges: ['a'],
          anyMinimumAmount: NaN,
          ranges: { a: { maximumUnits: NaN, unitPrice: 10 } },
          currency: 'GBP',
        };
        Rate.getChargeFromRate(rate).unitPrice.should.equal(10);
      });
      it('returns the relevant isPriceFixed value based on the rate and ' +
         'cargo', () => {
        const rate = {
          anyBasis: 'Shipment',
          isSplitByCargoType: false,
          anyRanges: ['a'],
          anyMinimumAmount: NaN,
          isAnyPriceFixed: false,
          ranges: { a: { maximumUnits: NaN, unitPrice: 10 } },
          currency: 'GBP',
        };
        Rate.getChargeFromRate(rate).isPriceFixed.should.equal(false);
      });
    });
  });
}
