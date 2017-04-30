/* eslint-env mocha */
/* eslint-disable func-names, prefer-arrow-callback */

import { chai } from 'meteor/practicalmeteor:chai';
import deepFreeze from 'deep-freeze';

import * as newQuoteReducers from './newQuoteReducers';

describe('New Quote Reducers', () => {
  chai.should();

  describe('Combined New Quote Reducer', () => {
    const { newQuote } = newQuoteReducers;

    it('defaults the three sections', () => {
      const newNewQuote = newQuote();

      newNewQuote.should.have.property('cargo');
      newNewQuote.should.have.property('movement');
      newNewQuote.should.have.property('otherServices');
    });
  });

  describe('Cargo Reducers', () => {
    describe('Combined Cargo Reducer', () => {
      const { cargo } = newQuoteReducers;

      it('defaults initial values', () => {
        const stateAfter = {
          cargoType: 'loose',
          packageLines: [],
          totalWeight: 0,
          totalPackages: 0,
          packageType: 'packages',
          weightUOM: 'kg',
          totalVolume: 0,
          unitVolumeUOM: 'cm',
          volumeUOM: 'cbm',
        };
        const newCargo = cargo();

        newCargo.cargoType.should.equal(stateAfter.cargoType);
        newCargo.packageLines.should.eql(stateAfter.packageLines);
        newCargo.totalWeight.should.equal(stateAfter.totalWeight);
        newCargo.totalPackages.should.equal(stateAfter.totalPackages);
        newCargo.packageType.should.equal(stateAfter.packageType);
        newCargo.weightUOM.should.equal(stateAfter.weightUOM);
        newCargo.totalVolume.should.equal(stateAfter.totalVolume);
        newCargo.unitVolumeUOM.should.equal(stateAfter.unitVolumeUOM);
        newCargo.volumeUOM.should.equal(stateAfter.volumeUOM);
      });
    });

    describe('Cargo Type Reducer', () => {
      const { cargoType } = newQuoteReducers;

      it('defaults to loose', () => {
        const stateAfter = 'loose';
        cargoType().should.equal(stateAfter);
      });

      it('changes its value', () => {
        const stateBefore = 'loose';
        const action = { type: 'SET_CARGO_TYPE', cargoType: 'containerized' };
        const stateAfter = 'containerized';
        deepFreeze(stateBefore);

        cargoType(stateBefore, action).should.equal(stateAfter);
      });
    });

    describe('Package Lines Reducer', () => {
      const { packageLines } = newQuoteReducers;

      it('defaults an empty array', () => {
        const stateAfter = [];
        packageLines().should.eql(stateAfter);
      });

      it('adds a package line to the end', () => {
        const stateBefore = [{ num: 1 }];
        const action = { type: 'ADD_PACKAGE_LINE' };
        const stateAfter = [{ num: 1 }, {}];
        deepFreeze(stateBefore);

        packageLines(stateBefore, action).should.eql(stateAfter);
      });

      it('removes a package line from the specified index', () => {
        const stateBefore = [{ num: 1 }, { num: 2 }, { num: 3 }];
        const action = { type: 'REMOVE_PACKAGE_LINE', index: 1 };
        const stateAfter = [{ num: 1 }, { num: 3 }];
        deepFreeze(stateBefore);

        packageLines(stateBefore, action).should.eql(stateAfter);
      });

      it('changes the package type at the specified index', () => {
        const stateBefore = [{}, { packageType: 'old' }];
        const action = { type: 'CHANGE_PACKAGE_TYPE', index: 1, packageType: 'new' };
        const stateAfter = [{}, { packageType: 'new' }];
        deepFreeze(stateBefore);

        packageLines(stateBefore, action).should.eql(stateAfter);
      });

      it('changes the number of packages at the specified index', () => {
        const stateBefore = [{}, { numPackages: 1, anotherProperty: true }];
        const action = { type: 'CHANGE_NUM_PACKAGES', index: 1, numPackages: 2 };
        const stateAfter = [{}, { numPackages: 2, anotherProperty: true }];
        deepFreeze(stateBefore);

        packageLines(stateBefore, action).should.eql(stateAfter);
      });

      it('changes the length at the specified index', () => {
        const stateBefore = [{}, { length: 1, anotherProperty: true }];
        const action = { type: 'CHANGE_LENGTH', index: 1, length: 2 };
        const stateAfter = [{}, { length: 2, anotherProperty: true }];
        deepFreeze(stateBefore);

        packageLines(stateBefore, action).should.eql(stateAfter);
      });

      it('changes the width at the specified index', () => {
        const stateBefore = [{}, { width: 1, anotherProperty: true }];
        const action = { type: 'CHANGE_WIDTH', index: 1, width: 2 };
        const stateAfter = [{}, { width: 2, anotherProperty: true }];
        deepFreeze(stateBefore);

        packageLines(stateBefore, action).should.eql(stateAfter);
      });

      it('changes the height at the specified index', () => {
        const stateBefore = [{}, { height: 1, anotherProperty: true }];
        const action = { type: 'CHANGE_HEIGHT', index: 1, height: 2 };
        const stateAfter = [{}, { height: 2, anotherProperty: true }];
        deepFreeze(stateBefore);

        packageLines(stateBefore, action).should.eql(stateAfter);
      });

      it('changes the volume at the specified index', () => {
        const stateBefore = [{}, { volume: 1, anotherProperty: true }];
        const action = { type: 'CHANGE_VOLUME', index: 1, volume: 2 };
        const stateAfter = [{}, { volume: 2, anotherProperty: true }];
        deepFreeze(stateBefore);

        packageLines(stateBefore, action).should.eql(stateAfter);
      });

      it('changes the volume UOM at the specified index', () => {
        const stateBefore = [{}, { volumeUOM: 1, anotherProperty: true }];
        const action = { type: 'CHANGE_VOLUME_UOM', index: 1, volumeUOM: 2 };
        const stateAfter = [{}, { volumeUOM: 2, anotherProperty: true }];
        deepFreeze(stateBefore);

        packageLines(stateBefore, action).should.eql(stateAfter);
      });

      it('changes the weight at the specified index', () => {
        const stateBefore = [{}, { weight: 1, anotherProperty: true }];
        const action = { type: 'CHANGE_WEIGHT', index: 1, weight: 2 };
        const stateAfter = [{}, { weight: 2, anotherProperty: true }];
        deepFreeze(stateBefore);

        packageLines(stateBefore, action).should.eql(stateAfter);
      });

      it('changes the weight UOM at the specified index', () => {
        const stateBefore = [{}, { weightUOM: 1, anotherProperty: true }];
        const action = { type: 'CHANGE_WEIGHT_UOM', index: 1, weightUOM: 2 };
        const stateAfter = [{}, { weightUOM: 2, anotherProperty: true }];
        deepFreeze(stateBefore);

        packageLines(stateBefore, action).should.eql(stateAfter);
      });
    });

    describe('Cargo Totals Function', () => {
      const { cargoTotals } = newQuoteReducers;

      it('defaults initial values', () => {
        const newCargoTotals = cargoTotals();

        newCargoTotals.totalPackages.should.equal(0);
        newCargoTotals.packageType.should.equal('packages');
        newCargoTotals.totalWeight.should.equal(0);
        newCargoTotals.totalVolume.should.equal(0);
        newCargoTotals.volumeUOM.should.equal('cbm');
      });

      it('adds up correctly', () => {
        const baseState = {
          packageLines: [
            { numPackages: 1, weight: 2, volume: 3 },
            { numPackages: 1, weight: 2, volume: 3 },
          ],
        };
        deepFreeze(baseState);
        const newCargoTotals = cargoTotals(baseState);

        newCargoTotals.totalPackages.should.equal(2);
        newCargoTotals.totalWeight.should.equal(4);
        newCargoTotals.totalVolume.should.equal(6);
      });

      it('handles missing values correctly', () => {
        const baseState = {
          packageLines: [
            { weight: 2, volume: 3 },
            { numPackages: 1, volume: 3 },
            { numPackages: 1, weight: 2 },
          ],
        };
        deepFreeze(baseState);
        const newCargoTotals = cargoTotals(baseState);

        newCargoTotals.totalPackages.should.equal(2);
        newCargoTotals.totalWeight.should.equal(4);
        newCargoTotals.totalVolume.should.equal(6);
      });

      it('returns the same package type when the types from all package lines are the same', () => {
        const baseState = {
          packageLines: [
            { packageType: 'pallets' },
            { packageType: 'pallets' },
          ],
        };
        deepFreeze(baseState);
        const newCargoTotals = cargoTotals(baseState);

        newCargoTotals.packageType.should.equal('pallets');
      });

      it('deals with multiple package types correctly', () => {
        const baseState = {
          packageLines: [
            { packageType: 'boxes' },
            { packageType: 'pallets' },
          ],
        };
        deepFreeze(baseState);
        const newCargoTotals = cargoTotals(baseState);

        newCargoTotals.packageType.should.equal('packages');
      });
    });
  });

  describe('Movement Reducer', () => {
    const { movement } = newQuoteReducers;

    it('sets the pickup location type', () => {
      const stateBefore = { pickup: { locationType: 'port' } };
      const action = { type: 'SET_PICKUP_LOCATION_TYPE', locationType: 'address' };
      const stateAfter = { pickup: { locationType: 'address' } };
      deepFreeze(stateBefore);

      movement(stateBefore, action).should.eql(stateAfter);
    });

    it('sets the pickup country', () => {
      const stateBefore = { pickup: { country: 'India' } };
      const action = { type: 'SET_PICKUP_COUNTRY', country: 'China' };
      const stateAfter = { pickup: { country: 'China' } };
      deepFreeze(stateBefore);

      movement(stateBefore, action).should.eql(stateAfter);
    });

    it('sets the pickup postal code', () => {
      const stateBefore = { pickup: { postalCode: '000000' } };
      const action = { type: 'SET_PICKUP_POSTAL_CODE', postalCode: '111111' };
      const stateAfter = { pickup: { postalCode: '111111' } };
      deepFreeze(stateBefore);

      movement(stateBefore, action).should.eql(stateAfter);
    });

    it('sets the pickup port code', () => {
      const stateBefore = { pickup: { portCode: '000000' } };
      const action = { type: 'SET_PICKUP_PORT_CODE', portCode: '111111' };
      const stateAfter = { pickup: { portCode: '111111' } };
      deepFreeze(stateBefore);

      movement(stateBefore, action).should.eql(stateAfter);
    });

    it('sets the delivery location type', () => {
      const stateBefore = { delivery: { locationType: 'port' } };
      const action = { type: 'SET_DELIVERY_LOCATION_TYPE', locationType: 'address' };
      const stateAfter = { delivery: { locationType: 'address' } };
      deepFreeze(stateBefore);

      movement(stateBefore, action).should.eql(stateAfter);
    });

    it('sets the delivery country', () => {
      const stateBefore = { delivery: { country: 'India' } };
      const action = { type: 'SET_DELIVERY_COUNTRY', country: 'China' };
      const stateAfter = { delivery: { country: 'China' } };
      deepFreeze(stateBefore);

      movement(stateBefore, action).should.eql(stateAfter);
    });

    it('sets the delivery postal code', () => {
      const stateBefore = { delivery: { postalCode: '000000' } };
      const action = { type: 'SET_DELIVERY_POSTAL_CODE', postalCode: '111111' };
      const stateAfter = { delivery: { postalCode: '111111' } };
      deepFreeze(stateBefore);

      movement(stateBefore, action).should.eql(stateAfter);
    });

    it('sets the delivery port code', () => {
      const stateBefore = { delivery: { portCode: '000000' } };
      const action = { type: 'SET_DELIVERY_PORT_CODE', portCode: '111111' };
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
      const action = { type: 'TOGGLE_INSURANCE' };
      const stateAfter = { insurance: true, customsClearance: false };
      deepFreeze(stateBefore);

      otherServices(stateBefore, action).should.eql(stateAfter);
    });

    it('toggles customs clearance', () => {
      const stateBefore = { insurance: false, customsClearance: false };
      const action = { type: 'TOGGLE_CUSTOMS_CLEARANCE' };
      const stateAfter = { insurance: false, customsClearance: true };
      deepFreeze(stateBefore);

      otherServices(stateBefore, action).should.eql(stateAfter);
    });
  });
});
