/* eslint-env mocha */
/* eslint-disable func-names, prefer-arrow-callback */

import { Meteor } from 'meteor/meteor';
import { chai } from 'meteor/practicalmeteor:chai';
import deepFreeze from 'deep-freeze';

import { rate, defaultRateState } from './rateReducer';
import * as ACTION_TYPES from '../../actions/actionTypes';

if (Meteor.isClient) {
  describe('Rate Reducer', () => {
    chai.should();
    it('defaults each field to blank', () => {
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
    it('sets the carrier', () => {
      const stateBefore = { carrier: 'a' };
      const action = {
        type: ACTION_TYPES.SET_RATE_CARRIER,
        carrier: 'b',
      };
      deepFreeze(stateBefore);
      rate(stateBefore, action).carrier.should.equal('b');
    });
    it('sets the basis', () => {
      const stateBefore = { basis: 'a' };
      const action = {
        type: ACTION_TYPES.SET_RATE_BASIS,
        basis: 'b',
      };
      deepFreeze(stateBefore);
      rate(stateBefore, action).basis.should.equal('b');
    });
    it('sets the unit price', () => {
      const stateBefore = { unitPrice: 1 };
      const action = {
        type: ACTION_TYPES.SET_RATE_UNIT_PRICE,
        unitPrice: 2,
      };
      deepFreeze(stateBefore);
      rate(stateBefore, action).unitPrice.should.equal(2);
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
