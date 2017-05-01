/* eslint-env mocha */
/* eslint-disable func-names, prefer-arrow-callback */

import { chai } from 'meteor/practicalmeteor:chai';
import deepFreeze from 'deep-freeze';

import * as newQuoteReducers from './newQuoteReducers';
import * as ACTION_TYPES from '../actions/actionTypes';

chai.should();

describe('New Quote Reducers', () => {
  describe('Combined New Quote Reducer', () => {
    const { newQuote } = newQuoteReducers;

    it('defaults the three sections', () => {
      const newNewQuote = newQuote();

      newNewQuote.should.have.property('cargo');
      newNewQuote.should.have.property('movement');
      newNewQuote.should.have.property('otherServices');
    });
  });

  describe('Movement Reducer', () => {
    const { movement } = newQuoteReducers;

    it('sets the pickup location type', () => {
      const stateBefore = { pickup: { locationType: 'port' } };
      const action = { type: ACTION_TYPES.SET_PICKUP_LOCATION_TYPE, locationType: 'address' };
      const stateAfter = { pickup: { locationType: 'address' } };
      deepFreeze(stateBefore);

      movement(stateBefore, action).should.eql(stateAfter);
    });

    it('sets the pickup country', () => {
      const stateBefore = { pickup: { country: 'India' } };
      const action = { type: ACTION_TYPES.SET_PICKUP_COUNTRY, country: 'China' };
      const stateAfter = { pickup: { country: 'China' } };
      deepFreeze(stateBefore);

      movement(stateBefore, action).should.eql(stateAfter);
    });

    it('sets the pickup postal code', () => {
      const stateBefore = { pickup: { postalCode: '000000' } };
      const action = { type: ACTION_TYPES.SET_PICKUP_POSTAL_CODE, postalCode: '111111' };
      const stateAfter = { pickup: { postalCode: '111111' } };
      deepFreeze(stateBefore);

      movement(stateBefore, action).should.eql(stateAfter);
    });

    it('sets the pickup port code', () => {
      const stateBefore = { pickup: { portCode: '000000' } };
      const action = { type: ACTION_TYPES.SET_PICKUP_PORT_CODE, portCode: '111111' };
      const stateAfter = { pickup: { portCode: '111111' } };
      deepFreeze(stateBefore);

      movement(stateBefore, action).should.eql(stateAfter);
    });

    it('sets the delivery location type', () => {
      const stateBefore = { delivery: { locationType: 'port' } };
      const action = { type: ACTION_TYPES.SET_DELIVERY_LOCATION_TYPE, locationType: 'address' };
      const stateAfter = { delivery: { locationType: 'address' } };
      deepFreeze(stateBefore);

      movement(stateBefore, action).should.eql(stateAfter);
    });

    it('sets the delivery country', () => {
      const stateBefore = { delivery: { country: 'India' } };
      const action = { type: ACTION_TYPES.SET_DELIVERY_COUNTRY, country: 'China' };
      const stateAfter = { delivery: { country: 'China' } };
      deepFreeze(stateBefore);

      movement(stateBefore, action).should.eql(stateAfter);
    });

    it('sets the delivery postal code', () => {
      const stateBefore = { delivery: { postalCode: '000000' } };
      const action = { type: ACTION_TYPES.SET_DELIVERY_POSTAL_CODE, postalCode: '111111' };
      const stateAfter = { delivery: { postalCode: '111111' } };
      deepFreeze(stateBefore);

      movement(stateBefore, action).should.eql(stateAfter);
    });

    it('sets the delivery port code', () => {
      const stateBefore = { delivery: { portCode: '000000' } };
      const action = { type: ACTION_TYPES.SET_DELIVERY_PORT_CODE, portCode: '111111' };
      const stateAfter = { delivery: { portCode: '111111' } };
      deepFreeze(stateBefore);

      movement(stateBefore, action).should.eql(stateAfter);
    });
  });

  describe('Other Services Reducer', () => {
    const { otherServices } = newQuoteReducers;

    it('defaults initial values', () => {
      const stateAfter = { insurance: false, customsClearance: false };

      otherServices().should.eql(stateAfter);
    });

    it('toggles insurance', () => {
      const stateBefore = { insurance: false, customsClearance: false };
      const action = { type: ACTION_TYPES.TOGGLE_INSURANCE };
      const stateAfter = { insurance: true, customsClearance: false };
      deepFreeze(stateBefore);

      otherServices(stateBefore, action).should.eql(stateAfter);
    });

    it('toggles customs clearance', () => {
      const stateBefore = { insurance: false, customsClearance: false };
      const action = { type: ACTION_TYPES.TOGGLE_CUSTOMS_CLEARANCE };
      const stateAfter = { insurance: false, customsClearance: true };
      deepFreeze(stateBefore);

      otherServices(stateBefore, action).should.eql(stateAfter);
    });
  });
});
