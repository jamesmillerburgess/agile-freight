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

    it('sets the pickup location type', () => {
      const stateBefore = { pickup: { locationType: 'port' } };
      const action = {
        type: ACTION_TYPES.SET_PICKUP_LOCATION_TYPE,
        locationType: 'address',
      };
      const stateAfter = { pickup: { locationType: 'address' } };
      deepFreeze(stateBefore);

      movement(stateBefore, action).should.eql(stateAfter);
    });

    it('sets the pickup country', () => {
      const stateBefore = { pickup: { country: 'India' } };
      const action = {
        type: ACTION_TYPES.SET_PICKUP_COUNTRY,
        country: 'China',
      };
      deepFreeze(stateBefore);

      movement(stateBefore, action).pickup.country.should.equal('China');
    });

    it('clears the pickup location if the pickup country changes', () => {
      const stateBefore = { pickup: { country: 'India', location: 'NSA' } };
      const action = {
        type: ACTION_TYPES.SET_PICKUP_COUNTRY,
        country: 'China',
      };
      deepFreeze(stateBefore);

      movement(stateBefore, action).pickup.location.should.equal('');
    });

    it('sets the pickup location', () => {
      const stateBefore = { pickup: { location: '000000' } };
      const action = {
        type: ACTION_TYPES.SET_PICKUP_LOCATION,
        location: '111111',
      };
      deepFreeze(stateBefore);

      movement(stateBefore, action).pickup.location.should.eql('111111');
    });

    it('sets the pickup location name', () => {
      const stateBefore = { pickup: { locationName: 'a' } };
      const action = {
        type: ACTION_TYPES.SET_PICKUP_LOCATION_NAME,
        locationName: 'b',
      };
      deepFreeze(stateBefore);

      movement(stateBefore, action).pickup.locationName.should.equal('b');
    });

    it('sets the delivery location type', () => {
      const stateBefore = { delivery: { locationType: 'port' } };
      const action = {
        type: ACTION_TYPES.SET_DELIVERY_LOCATION_TYPE,
        locationType: 'address',
      };
      const stateAfter = { delivery: { locationType: 'address' } };
      deepFreeze(stateBefore);

      movement(stateBefore, action).should.eql(stateAfter);
    });

    it('sets the delivery country', () => {
      const stateBefore = { delivery: { country: 'India' } };
      const action = {
        type: ACTION_TYPES.SET_DELIVERY_COUNTRY,
        country: 'China',
      };
      deepFreeze(stateBefore);

      movement(stateBefore, action).delivery.country.should.equal('China');
    });

    it('clears the delivery location if the delivery country changes', () => {
      const stateBefore = { delivery: { country: 'India', location: 'NSA' } };
      const action = {
        type: ACTION_TYPES.SET_DELIVERY_COUNTRY,
        country: 'China',
      };
      deepFreeze(stateBefore);

      movement(stateBefore, action).delivery.location.should.equal('');
    });

    it('sets the delivery location', () => {
      const stateBefore = { delivery: { location: '000000' } };
      const action = {
        type: ACTION_TYPES.SET_DELIVERY_LOCATION,
        location: '111111',
      };
      deepFreeze(stateBefore);

      movement(stateBefore, action).delivery.location.should.eql('111111');
    });

    it('sets the delivery location name', () => {
      const stateBefore = { delivery: { locationName: 'a' } };
      const action = {
        type: ACTION_TYPES.SET_DELIVERY_LOCATION_NAME,
        locationName: 'b',
      };
      deepFreeze(stateBefore);

      movement(stateBefore, action).delivery.locationName.should.equal('b');
    });
  });
}
