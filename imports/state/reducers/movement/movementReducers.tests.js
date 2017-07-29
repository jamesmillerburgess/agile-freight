/* eslint-env mocha */
/* eslint-disable func-names, prefer-arrow-callback */

import { Meteor } from 'meteor/meteor';
import { chai } from 'meteor/practicalmeteor:chai';
import deepFreeze from 'deep-freeze';

import { movement } from './movementReducers';
import * as ACTION_TYPES from '../../actions/actionTypes';

if (Meteor.isClient) {
  describe('Movement Reducer', () => {
    chai.should();
    it('loads the movement section of a quote', () => {
      const movementToLoad = {
        pickup: {
          locationType: 'a',
          country: 'b',
          location: 'c',
        },
        delivery: {
          locationType: 'd',
          country: 'e',
          location: 'f',
        },
      };
      const action = {
        type: ACTION_TYPES.LOAD_QUOTE,
        quote: { movement: movementToLoad },
      };
      movement({}, action).should.eql(movementToLoad);
    });
    it('loads the movement section of a shipment', () => {
      const movementToLoad = {
        pickup: {
          locationType: 'a',
          country: 'b',
          location: 'c',
        },
        delivery: {
          locationType: 'd',
          country: 'e',
          location: 'f',
        },
      };
      const action = {
        type: ACTION_TYPES.LOAD_SHIPMENT,
        shipment: { movement: movementToLoad },
      };
      movement({}, action).should.eql(movementToLoad);
    });
    it('sets the mode', () => {
      const stateBefore = { mode: '' };
      const action = { type: ACTION_TYPES.SET_MOVEMENT_MODE, mode: 'a' };
      deepFreeze(stateBefore);
      movement(stateBefore, action).mode.should.equal('a');
    });
    it('sets the terms of sale', () => {
      const stateBefore = { termsOfSale: '' };
      const action = {
        type: ACTION_TYPES.SET_MOVEMENT_TERMS_OF_SALE,
        termsOfSale: 'a',
      };
      deepFreeze(stateBefore);
      movement(stateBefore, action).termsOfSale.should.equal('a');
    });
    it('clears the mode if terms of sale are set to \'Brokerage\'', () => {
      const stateBefore = { mode: '', termsOfSale: 'CFR' };
      const action = {
        type: ACTION_TYPES.SET_MOVEMENT_MODE,
        mode: 'Brokerage',
      };
      deepFreeze(stateBefore);
      movement(stateBefore, action).termsOfSale.should.equal('');
    });
    it('sets the commercial party', () => {
      const stateBefore = { commercialParty: '' };
      const action = {
        type: ACTION_TYPES.SET_MOVEMENT_COMMERCIAL_PARTY,
        commercialParty: 'Buyer',
      };
      deepFreeze(stateBefore);
      movement(stateBefore, action).commercialParty.should.equal('Buyer');
    });
    it('sets the carrier', () => {
      const stateBefore = { carrier: '' };
      const action = {
        type: ACTION_TYPES.SET_CARRIER,
        carrier: 'MAEU',
      };
      deepFreeze(stateBefore);
      movement(stateBefore, action).carrier.should.equal('MAEU');
    });
    it('sets the receipt', () => {
      const stateBefore = { receipt: {} };
      const action = {
        type: ACTION_TYPES.SET_RECEIPT,
        receipt: { code: 'USMIA' },
      };
      deepFreeze(stateBefore);
      movement(stateBefore, action).receipt.code.should.equal('USMIA');
    });
    it('sets the departure', () => {
      const stateBefore = { departure: {} };
      const action = {
        type: ACTION_TYPES.SET_DEPARTURE,
        departure: { code: 'USMIA' },
      };
      deepFreeze(stateBefore);
      movement(stateBefore, action).departure.code.should.equal('USMIA');
    });
    it('sets the arrival', () => {
      const stateBefore = { arrival: {} };
      const action = {
        type: ACTION_TYPES.SET_ARRIVAL,
        arrival: { code: 'USMIA' },
      };
      deepFreeze(stateBefore);
      movement(stateBefore, action).arrival.code.should.equal('USMIA');
    });
    it('sets the delivery', () => {
      const stateBefore = { delivery: {} };
      const action = {
        type: ACTION_TYPES.SET_DELIVERY,
        delivery: { code: 'USMIA' },
      };
      deepFreeze(stateBefore);
      movement(stateBefore, action).delivery.code.should.equal('USMIA');
    });
    it('sets the receipt date', () => {
      const stateBefore = { receiptDate: 'a' };
      const action = {
        type: ACTION_TYPES.SET_RECEIPT_DATE,
        receiptDate: 'b',
      };
      deepFreeze(stateBefore);
      movement(stateBefore, action).receiptDate.should.equal('b');
    });
    it('sets the departure date', () => {
      const stateBefore = { departureDate: 'a' };
      const action = {
        type: ACTION_TYPES.SET_DEPARTURE_DATE,
        departureDate: 'b',
      };
      deepFreeze(stateBefore);
      movement(stateBefore, action).departureDate.should.equal('b');
    });
    it('sets the arrival date', () => {
      const stateBefore = { arrivalDate: 'a' };
      const action = {
        type: ACTION_TYPES.SET_ARRIVAL_DATE,
        arrivalDate: 'b',
      };
      deepFreeze(stateBefore);
      movement(stateBefore, action).arrivalDate.should.equal('b');
    });
    it('sets the delivery date', () => {
      const stateBefore = { deliveryDate: 'a' };
      const action = {
        type: ACTION_TYPES.SET_DELIVERY_DATE,
        deliveryDate: 'b',
      };
      deepFreeze(stateBefore);
      movement(stateBefore, action).deliveryDate.should.equal('b');
    });
    it('sets pre-carriage by', () => {
      const state = { preCarriageBy: 'a' };
      const action = {
        type: ACTION_TYPES.SET_PRE_CARRIAGE_BY,
        preCarriageBy: 'b',
      };
      movement(state, action).preCarriageBy.should.equal('b');
    });
    it('sets vessel', () => {
      const state = { vessel: 'a' };
      const action = {
        type: ACTION_TYPES.SET_VESSEL,
        vessel: 'b',
      };
      movement(state, action).vessel.should.equal('b');
    });
  });
}
