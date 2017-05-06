/* eslint-env mocha */
/* eslint-disable func-names, prefer-arrow-callback */

import { chai } from 'meteor/practicalmeteor:chai';
import deepFreeze from 'deep-freeze';

import { movement } from './movementReducers';
import * as ACTION_TYPES from '../actions/actionTypes';

chai.should();

describe('Movement Reducer', () => {
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
    deepFreeze(stateBefore);

    movement(stateBefore, action).pickup.country.should.equal('China');
  });

  it('clears the pickup port code if the pickup country changes', () => {
    const stateBefore = { pickup: { country: 'India', portCode: 'NSA' } };
    const action = { type: ACTION_TYPES.SET_PICKUP_COUNTRY, country: 'China' };
    deepFreeze(stateBefore);

    movement(stateBefore, action).pickup.portCode.should.equal('');
  });

  it('clears the pickup postal code if the pickup country changes', () => {
    const stateBefore = { pickup: { country: 'India', portCode: 'NSA' } };
    const action = { type: ACTION_TYPES.SET_PICKUP_COUNTRY, country: 'China' };
    deepFreeze(stateBefore);

    movement(stateBefore, action).pickup.postalCode.should.equal('');
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
    deepFreeze(stateBefore);

    movement(stateBefore, action).delivery.country.should.equal('China');
  });

  it('clears the delivery port code if the delivery country changes', () => {
    const stateBefore = { delivery: { country: 'India', portCode: 'NSA' } };
    const action = { type: ACTION_TYPES.SET_DELIVERY_COUNTRY, country: 'China' };
    deepFreeze(stateBefore);

    movement(stateBefore, action).delivery.portCode.should.equal('');
  });

  it('clears the delivery postal code if the delivery country changes', () => {
    const stateBefore = { delivery: { country: 'India', portCode: 'NSA' } };
    const action = { type: ACTION_TYPES.SET_DELIVERY_COUNTRY, country: 'China' };
    deepFreeze(stateBefore);

    movement(stateBefore, action).delivery.postalCode.should.equal('');
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
