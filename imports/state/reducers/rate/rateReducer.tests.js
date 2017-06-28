/* eslint-env mocha */
/* eslint-disable func-names, prefer-arrow-callback */

import { Meteor } from 'meteor/meteor';
import { chai } from 'meteor/practicalmeteor:chai';
import deepFreeze from 'deep-freeze';

import { rate, defaultRateState } from './rateReducer';
import * as ACTION_TYPES from '../../actions/actionTypes';

chai.should();

if (Meteor.isClient) {
  describe('Rate Reducer', () => {
    it('defaults to the default rate', () => {
      rate().should.eql(defaultRateState);
    });
    it('loads a rate', () => {
      const action = { type: ACTION_TYPES.LOAD_RATE, rate: { type: 'a' } };
      rate({}, action).type.should.equal('a');
    });
    it('sets the type', () => {
      const stateBefore = { type: 'a' };
      const action = { type: ACTION_TYPES.SET_RATE_TYPE, rateType: 'b' };
      deepFreeze(stateBefore);
      rate(stateBefore, action).type.should.equal('b');
    });
    it('sets the charge code', () => {
      const stateBefore = { chargeCode: 'a' };
      const action = {
        type: ACTION_TYPES.SET_RATE_CHARGE_CODE,
        chargeCode: 'b',
      };
      deepFreeze(stateBefore);
      rate(stateBefore, action).chargeCode.should.equal('b');
    });
    it('sets the level', () => {
      const stateBefore = { level: 'a' };
      const action = {
        type: ACTION_TYPES.SET_RATE_LEVEL,
        level: 'b',
      };
      deepFreeze(stateBefore);
      rate(stateBefore, action).level.should.equal('b');
    });
    it('sets the route', () => {
      const stateBefore = { route: 'a' };
      const action = {
        type: ACTION_TYPES.SET_RATE_ROUTE,
        route: 'b',
      };
      deepFreeze(stateBefore);
      rate(stateBefore, action).route.should.equal('b');
    });
    it('toggles split by cargo type', () => {
      const stateBefore = { isSplitByCargoType: false };
      const action = { type: ACTION_TYPES.TOGGLE_RATE_IS_SPLIT_BY_CARGO_TYPE };
      rate(stateBefore, action).isSplitByCargoType.should.equal(true);
    });
    it('sets the basis for any cargo type', () => {
      const stateBefore = { anyBasis: 'a' };
      const action = {
        type: ACTION_TYPES.SET_RATE_BASIS,
        basis: 'b',
        cargoType: 'any',
      };
      deepFreeze(stateBefore);
      rate(stateBefore, action).anyBasis.should.equal('b');
    });
    it('sets the basis for loose cargo', () => {
      const stateBefore = { looseBasis: 'a' };
      const action = {
        type: ACTION_TYPES.SET_RATE_BASIS,
        basis: 'b',
        cargoType: 'loose',
      };
      deepFreeze(stateBefore);
      rate(stateBefore, action).looseBasis.should.equal('b');
    });
    it('sets the basis for containerized cargo', () => {
      const stateBefore = { containerizedBasis: 'a' };
      const action = {
        type: ACTION_TYPES.SET_RATE_BASIS,
        basis: 'b',
        cargoType: 'containerized',
      };
      deepFreeze(stateBefore);
      rate(stateBefore, action).containerizedBasis.should.equal('b');
    });
    it('sets the minumum amount for any cargo type', () => {
      const stateBefore = { anyMinimumAmount: 1 };
      const action = {
        type: ACTION_TYPES.SET_RATE_MINIMUM_AMOUNT,
        minimumAmount: 2,
        cargoType: 'any',
      };
      deepFreeze(stateBefore);
      rate(stateBefore, action).anyMinimumAmount.should.equal(2);
    });
    it('sets the minumum amount for loose cargo', () => {
      const stateBefore = { looseMinimumAmount: 1 };
      const action = {
        type: ACTION_TYPES.SET_RATE_MINIMUM_AMOUNT,
        minimumAmount: 2,
        cargoType: 'loose',
      };
      deepFreeze(stateBefore);
      rate(stateBefore, action).looseMinimumAmount.should.equal(2);
    });
    it('sets the minumum amount for containerized cargo', () => {
      const stateBefore = { containerizedMinimumAmount: 1 };
      const action = {
        type: ACTION_TYPES.SET_RATE_MINIMUM_AMOUNT,
        minimumAmount: 2,
        cargoType: 'containerized',
      };
      deepFreeze(stateBefore);
      rate(stateBefore, action).containerizedMinimumAmount.should.equal(2);
    });
    it('adds a range for any cargo type', () => {
      const stateBefore = { anyRanges: [], ranges: {} };
      const range = { maximumUnits: 50, unitPrice: 10 };
      const action = {
        type: ACTION_TYPES.ADD_RATE_RANGE,
        id: 'a',
        range,
        cargoType: 'any',
      };
      deepFreeze(stateBefore);
      const stateAfter = rate(stateBefore, action);
      stateAfter.anyRanges.should.eql(['a']);
      stateAfter.ranges.should.eql({ a: range });
    });
    it('adds a range for loose cargo', () => {
      const stateBefore = { looseRanges: [], ranges: {} };
      const range = { maximumUnits: 50, unitPrice: 10 };
      const action = {
        type: ACTION_TYPES.ADD_RATE_RANGE,
        id: 'a',
        range,
        cargoType: 'loose',
      };
      deepFreeze(stateBefore);
      const stateAfter = rate(stateBefore, action);
      stateAfter.looseRanges.should.eql(['a']);
      stateAfter.ranges.should.eql({ a: range });
    });
    it('adds a range for containerized cargo', () => {
      const stateBefore = { containerizedRanges: [], ranges: {} };
      const range = { maximumUnits: 50, unitPrice: 10 };
      const action = {
        type: ACTION_TYPES.ADD_RATE_RANGE,
        id: 'a',
        range,
        cargoType: 'containerized',
      };
      deepFreeze(stateBefore);
      const stateAfter = rate(stateBefore, action);
      stateAfter.containerizedRanges.should.eql(['a']);
      stateAfter.ranges.should.eql({ a: range });
    });
    it('sets the unit price in a range', () => {
      const stateBefore = { ranges: { a: { unitPrice: 1 } } };
      const action = {
        type: ACTION_TYPES.SET_RATE_RANGE_UNIT_PRICE,
        id: 'a',
        unitPrice: 2,
      };
      deepFreeze(stateBefore);
      rate(stateBefore, action).ranges.a.unitPrice.should.equal(2);
    });
    it('sets the maximumUnits in a range', () => {
      const stateBefore = { ranges: { a: { maximumUnits: 1 } } };
      const action = {
        type: ACTION_TYPES.SET_RATE_RANGE_MAXIMUM_UNITS,
        id: 'a',
        maximumUnits: 2,
      };
      deepFreeze(stateBefore);
      rate(stateBefore, action).ranges.a.maximumUnits.should.equal(2);
    });
    it('removes a range for any cargo type', () => {
      const stateBefore = { anyRanges: ['a'], ranges: { a: {} } };
      const action = {
        type: ACTION_TYPES.REMOVE_RATE_RANGE,
        id: 'a',
      };
      deepFreeze(stateBefore);
      const stateAfter = rate(stateBefore, action);
      stateAfter.anyRanges.should.eql([]);
      stateAfter.ranges.should.eql({});
    });
    it('removes a range for loose cargo', () => {
      const stateBefore = { looseRanges: ['a'], ranges: { a: {} } };
      const action = {
        type: ACTION_TYPES.REMOVE_RATE_RANGE,
        id: 'a',
      };
      deepFreeze(stateBefore);
      const stateAfter = rate(stateBefore, action);
      stateAfter.looseRanges.should.eql([]);
      stateAfter.ranges.should.eql({});
    });
    it('removes a range for containerized cargo', () => {
      const stateBefore = { containerizedRanges: ['a'], ranges: { a: {} } };
      const action = {
        type: ACTION_TYPES.REMOVE_RATE_RANGE,
        id: 'a',
      };
      deepFreeze(stateBefore);
      const stateAfter = rate(stateBefore, action);
      stateAfter.containerizedRanges.should.eql([]);
      stateAfter.ranges.should.eql({});
    });
    it('sets the currency', () => {
      const stateBefore = { currency: 'a' };
      const action = {
        type: ACTION_TYPES.SET_RATE_CURRENCY,
        currency: 'b',
      };
      deepFreeze(stateBefore);
      rate(stateBefore, action).currency.should.equal('b');
    });
  });
}
