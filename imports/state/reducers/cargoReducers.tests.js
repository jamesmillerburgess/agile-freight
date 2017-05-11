/* eslint-env mocha */
/* eslint-disable func-names, prefer-arrow-callback */

import { Meteor } from 'meteor/meteor';
import { chai } from 'meteor/practicalmeteor:chai';
import deepFreeze from 'deep-freeze';

import * as cargoReducers from './cargoReducers';
import * as ACTION_TYPES from '../actions/actionTypes';

if (Meteor.isClient) {
  describe('Cargo Reducers', () => {
    chai.should();

    describe('Combined Cargo Reducer', () => {
      const { cargo } = cargoReducers;

      it('defaults initial values', () => {
        const stateAfter = {
          cargoType: 'loose',
          ratedQuote: false,
          packageLines: [{
            packageType: 'Packages',
            numPackages: 1,
            length: '',
            width: '',
            height: '',
            unitVolumeUOM: 'cm',
            volume: 0,
            volumeUOM: 'cbm',
            weight: '',
            weightUOM: 'kg',
            totalWeight: 0,
          }],
          containerLines: [{ numContainers: 1, containerType: '20\'', temperatureControlled: false }],
          totalWeight: 0,
          totalPackages: 1,
          packageType: 'Packages',
          weightUOM: 'kg',
          totalVolume: 0,
          volumeUOM: 'cbm',
          totalContainers: 1,
          totalTEU: 1,
          hazardous: false,
          temperatureControlled: false,
        };
        const newCargo   = cargo();

        newCargo.should.eql(stateAfter);
      });
    });

    describe('Cargo Type Reducer', () => {
      const { cargoType } = cargoReducers;

      it('defaults to loose', () => {
        const newCargoType = cargoType();
        newCargoType.should.equal('loose');
      });

      it('changes its value', () => {
        const stateBefore = 'loose';
        const action      = { type: ACTION_TYPES.SET_CARGO_TYPE, cargoType: 'containerized' };
        deepFreeze(stateBefore);
        const newCargoType = cargoType(stateBefore, action);

        newCargoType.should.equal('containerized');
      });
    });

    describe('Rated Quote Reducer', () => {
      const { ratedQuote } = cargoReducers;

      it('defaults to false', () => {
        const newRatedQuote = ratedQuote();
        newRatedQuote.should.equal(false);
      });

      it('toggles on', () => {
        const stateBefore = false;
        const action      = { type: ACTION_TYPES.TOGGLE_RATED_QUOTE };
        deepFreeze(stateBefore);
        const newRatedQuote = ratedQuote(stateBefore, action);

        newRatedQuote.should.equal(true);
      });

      it('toggles off', () => {
        const stateBefore = true;
        const action      = { type: ACTION_TYPES.TOGGLE_RATED_QUOTE };
        deepFreeze(stateBefore);
        const newRatedQuote = ratedQuote(stateBefore, action);

        newRatedQuote.should.equal(false);
      });
    });

    describe('Package Lines Reducer', () => {
      const { packageLines } = cargoReducers;

      it('defaults a single package line', () => {
        const stateAfter = [{
          packageType: 'Packages',
          numPackages: 1,
          length: '',
          width: '',
          height: '',
          unitVolumeUOM: 'cm',
          volume: 0,
          volumeUOM: 'cbm',
          weight: '',
          weightUOM: 'kg',
          totalWeight: 0,
        }];

        packageLines().should.eql(stateAfter);
      });

      it('adds a package line to the end', () => {
        const stateBefore = [{ num: 1 }];
        const action      = { type: ACTION_TYPES.ADD_PACKAGE_LINE };
        const lengthAfter = 2;
        deepFreeze(stateBefore);

        packageLines(stateBefore, action).length.should.eql(lengthAfter);
      });

      it('removes a package line from the specified index', () => {
        const stateBefore = [{ num: 1 }, { num: 2 }, { num: 3 }];
        const action      = { type: ACTION_TYPES.REMOVE_PACKAGE_LINE, index: 1 };
        const lengthAfter = 2;
        deepFreeze(stateBefore);

        packageLines(stateBefore, action).length.should.eql(lengthAfter);
      });

      it('changes the package type at the specified index', () => {
        const stateBefore      = [{}, { packageType: 'old' }];
        const action           = {
          type: ACTION_TYPES.SET_PACKAGE_LINE_PACKAGE_TYPE,
          index: 1,
          packageType: 'new',
        };
        const packageTypeAfter = 'new';
        deepFreeze(stateBefore);

        packageLines(stateBefore, action)[1].packageType.should.eql(packageTypeAfter);
      });

      it('changes the number of packages at the specified index', () => {
        const stateBefore      = [{}, { numPackages: 1, anotherProperty: true }];
        const action           = {
          type: ACTION_TYPES.SET_PACKAGE_LINE_NUM_PACKAGES,
          index: 1,
          numPackages: 2
        };
        const numPackagesAfter = 2;
        deepFreeze(stateBefore);

        packageLines(stateBefore, action)[1].numPackages.should.eql(numPackagesAfter);
      });

      it('changes the length at the specified index', () => {
        const stateBefore = [{}, { length: 1, anotherProperty: true }];
        const action      = { type: ACTION_TYPES.SET_PACKAGE_LINE_LENGTH, index: 1, length: 2 };
        const lengthAfter = 2;
        deepFreeze(stateBefore);

        packageLines(stateBefore, action)[1].length.should.eql(lengthAfter);
      });

      it('changes the width at the specified index', () => {
        const stateBefore = [{}, { width: 1, anotherProperty: true }];
        const action      = { type: ACTION_TYPES.SET_PACKAGE_LINE_WIDTH, index: 1, width: 2 };
        const widthAfter  = 2;
        deepFreeze(stateBefore);

        packageLines(stateBefore, action)[1].width.should.eql(widthAfter);
      });

      it('changes the height at the specified index', () => {
        const stateBefore = [{}, { height: 1, anotherProperty: true }];
        const action      = { type: ACTION_TYPES.SET_PACKAGE_LINE_HEIGHT, index: 1, height: 2 };
        const heightAfter = 2;
        deepFreeze(stateBefore);

        packageLines(stateBefore, action)[1].height.should.eql(heightAfter);
      });

      it('changes the unit volume UOM at the specified index', () => {
        const stateBefore        = [{}, { unitVolumeUOM: 'in' }];
        const action             = {
          type: ACTION_TYPES.SET_PACKAGE_LINE_UNIT_VOLUME_UOM,
          index: 1,
          unitVolumeUOM: 'cm'
        };
        const unitVolumeUOMAfter = 'cm';
        deepFreeze(stateBefore);

        packageLines(stateBefore, action)[1].unitVolumeUOM.should.eql(unitVolumeUOMAfter);
      });

      it('changes the weight at the specified index', () => {
        const stateBefore = [{}, { weight: 1, anotherProperty: true }];
        const action      = { type: ACTION_TYPES.SET_PACKAGE_LINE_WEIGHT, index: 1, weight: 2 };
        const weightAfter = 2;
        deepFreeze(stateBefore);

        packageLines(stateBefore, action)[1].weight.should.eql(weightAfter);
      });

      it('changes the weight UOM at the specified index', () => {
        const stateBefore    = [{}, { weightUOM: 'lb', anotherProperty: true }];
        const action         = {
          type: ACTION_TYPES.SET_PACKAGE_LINE_WEIGHT_UOM,
          index: 1,
          weightUOM: 'kg'
        };
        const weightUOMAfter = 'kg';
        deepFreeze(stateBefore);

        packageLines(stateBefore, action)[1].weightUOM.should.eql(weightUOMAfter);
      });

      it('updates the total weight', () => {
        const stateBefore      = [{ numPackages: 2 }];
        const action           = { type: ACTION_TYPES.SET_PACKAGE_LINE_WEIGHT, index: 0, weight: 2 };
        const totalWeightAfter = 4;
        deepFreeze(stateBefore);

        packageLines(stateBefore, action)[0].totalWeight.should.equal(totalWeightAfter);
      });

      it('updates the total volume', () => {
        const stateBefore = [{ numPackages: 2, length: 100, width: 100, unitVolumeUOM: 'cm' }];
        const action      = { type: ACTION_TYPES.SET_PACKAGE_LINE_HEIGHT, index: 0, height: 100 };
        const volumeAfter = 2;
        deepFreeze(stateBefore);

        packageLines(stateBefore, action)[0].volume.should.equal(volumeAfter);
      });

      it('sets the volume UOM to \'cft\' when unit volume UOM is \'in\'', () => {
        const stateBefore    = [{ unitVolumeUOM: 'cm' }];
        const action         = {
          type: ACTION_TYPES.SET_PACKAGE_LINE_UNIT_VOLUME_UOM,
          index: 0,
          unitVolumeUOM: 'in'
        };
        const volumeUOMAfter = 'cft';
        deepFreeze(stateBefore);

        packageLines(stateBefore, action)[0].volumeUOM.should.equal(volumeUOMAfter);
      });

      it('sets the volume UOM to \'cbm\' when unit volume UOM is \'cm\'', () => {
        const stateBefore    = [{ unitVolumeUOM: 'in' }];
        const action         = {
          type: ACTION_TYPES.SET_PACKAGE_LINE_UNIT_VOLUME_UOM,
          index: 0,
          unitVolumeUOM: 'cm'
        };
        const volumeUOMAfter = 'cbm';
        deepFreeze(stateBefore);

        packageLines(stateBefore, action)[0].volumeUOM.should.equal(volumeUOMAfter);
      });
    });

    describe('Container Lines Reducer', () => {
      const { containerLines } = cargoReducers;

      it('defaults a single container line', () => {
        containerLines().length.should.equal(1);
      });

      it('adds a container line to the end', () => {
        const stateBefore = [{}];
        const action      = { type: ACTION_TYPES.ADD_CONTAINER_LINE };
        deepFreeze(stateBefore);

        containerLines(stateBefore, action).length.should.equal(2);
      });

      it('removes a container line from the specified index', () => {
        const stateBefore = [{}, {}];
        const action      = { type: ACTION_TYPES.REMOVE_CONTAINER_LINE, index: 1 };
        deepFreeze(stateBefore);

        containerLines(stateBefore, action).length.should.equal(1);
      });

      it('changes the number of containers at the specified index', () => {
        const stateBefore = [
          { numContainers: 1 },
          { numContainers: 2 },
        ];
        const action      = {
          type: ACTION_TYPES.SET_CONTAINER_LINE_NUM_CONTAINERS,
          index: 1,
          numContainers: 3,
        };

        containerLines(stateBefore, action)[1].numContainers.should.equal(3);
      });

      it('changes the container type at the specified index', () => {
        const stateBefore = [
          { containerType: '20\'' },
          { containerType: '40\'' },
        ];
        const action      = {
          type: ACTION_TYPES.SET_CONTAINER_LINE_CONTAINER_TYPE,
          index: 1,
          containerType: '45\'',
        };

        containerLines(stateBefore, action)[1].containerType.should.equal('45\'');
      });

      it('toggles temperature controlled at the specified index', () => {
        const stateBefore1 = [{ temperatureControlled: false }];
        const action       = {
          type: ACTION_TYPES.TOGGLE_CONTAINER_LINE_TEMPERATURE_CONTROLLED,
          index: 0,
        };

        containerLines(stateBefore1, action)[0].temperatureControlled.should.equal(true);

        const stateBefore2 = [{ temperatureControlled: true }];

        containerLines(stateBefore2, action)[0].temperatureControlled.should.equal(false);
      });
    });

    describe('Cargo Totals Function', () => {
      const { cargoTotals } = cargoReducers;

      it('defaults initial values', () => {
        const newCargoTotals = cargoTotals();

        newCargoTotals.totalPackages.should.equal(0);
        newCargoTotals.packageType.should.equal('Packages');
        newCargoTotals.totalVolume.should.equal(0);
        newCargoTotals.volumeUOM.should.equal('cbm');
        newCargoTotals.totalWeight.should.equal(0);
        newCargoTotals.weightUOM.should.equal('kg');
      });

      it('adds up package lines correctly', () => {
        const baseState = {
          packageLines: [
            { numPackages: 2, totalWeight: 3, volume: 4 },
            { numPackages: 2, totalWeight: 3, volume: 4 },
          ],
        };
        deepFreeze(baseState);
        const newCargoTotals = cargoTotals(baseState);

        newCargoTotals.totalPackages.should.equal(4);
        newCargoTotals.totalWeight.should.equal(6);
        newCargoTotals.totalVolume.should.equal(8);
      });

      it('handles missing package line values correctly', () => {
        const baseState = {
          packageLines: [
            { totalWeight: 2, volume: 3 },
            { numPackages: 1, volume: 3 },
            { numPackages: 1, totalWeight: 2 },
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
            { packageType: 'Pallets' },
            { packageType: 'Pallets' },
          ],
        };
        deepFreeze(baseState);
        const newCargoTotals = cargoTotals(baseState);

        newCargoTotals.packageType.should.equal('Pallets');
      });

      it('deals with multiple package types correctly', () => {
        const baseState = {
          packageLines: [
            { packageType: 'Boxes' },
            { packageType: 'Pallets' },
          ],
        };
        deepFreeze(baseState);
        const newCargoTotals = cargoTotals(baseState);

        newCargoTotals.packageType.should.equal('Packages');
      });

      it('sets the volume units to the same as the first package row', () => {
        const baseState1 = {
          packageLines: [
            { volumeUOM: 'cbm' },
            { volumeUOM: 'cft' },
          ],
        };
        deepFreeze(baseState1);

        cargoTotals(baseState1).volumeUOM.should.equal('cbm');

        const baseState2 = {
          packageLines: [
            { volumeUOM: 'cft' },
            { volumeUOM: 'cbm' },
          ],
        };
        deepFreeze(baseState2);

        cargoTotals(baseState2).volumeUOM.should.equal('cft');
      });

      it('sets the weight units to the same as the first package row', () => {
        const baseState1 = {
          packageLines: [
            { weightUOM: 'kg' },
            { weightUOM: 'lb' },
          ],
        };
        deepFreeze(baseState1);

        cargoTotals(baseState1).weightUOM.should.equal('kg');

        const baseState2 = {
          packageLines: [
            { weightUOM: 'lb' },
            { weightUOM: 'kg' },
          ],
        };
        deepFreeze(baseState2);

        cargoTotals(baseState2).weightUOM.should.equal('lb');
      });

      it('totals the volume correctly when units are mixed on the package lines', () => {
        const baseState1 = {
          packageLines: [
            { volume: 1, volumeUOM: 'cbm' },
            { volume: 1, volumeUOM: 'cft' },
          ],
        };
        deepFreeze(baseState1);

        cargoTotals(baseState1).totalVolume.should.equal(1.028316846711706135);

        const baseState2 = {
          packageLines: [
            { volume: 1, volumeUOM: 'cft' },
            { volume: 1, volumeUOM: 'cbm' },
          ],
        };
        deepFreeze(baseState2);

        cargoTotals(baseState2).totalVolume.should.equal(36.3146665722);
      });

      it('totals the weight correctly when units are mixed on the package lines', () => {
        const baseState1 = {
          packageLines: [
            { totalWeight: 1, weightUOM: 'kg' },
            { totalWeight: 1, weightUOM: 'lb' },
          ],
        };
        deepFreeze(baseState1);

        cargoTotals(baseState1).totalWeight.should.equal(1.45359237);

        const baseState2 = {
          packageLines: [
            { totalWeight: 1, weightUOM: 'lb' },
            { totalWeight: 1, weightUOM: 'kg' },
          ],
        };
        deepFreeze(baseState2);

        cargoTotals(baseState2).totalWeight.should.equal(3.2046226218487757);
      });

      it('totals containers correctly', () => {
        const baseState = {
          containerLines: [
            { numContainers: 1 },
            { numContainers: 2 },
          ],
        };
        deepFreeze(baseState);

        cargoTotals(baseState).totalContainers.should.equal(3);
      });

      it('totals TEU correctly', () => {
        const baseState = {
          containerLines: [
            { numContainers: 1, containerType: '20\'' },   // 1
            { numContainers: 2, containerType: '40\'' },   // 4
            { numContainers: 3, containerType: '40\'HC' }, // 6
            { numContainers: 4, containerType: '45\'HC' }, // 8
          ],
        };
        deepFreeze(baseState);

        cargoTotals(baseState).totalTEU.should.equal(19);
      });
    });

    describe('Hazardous Reducer', () => {
      const { hazardous } = cargoReducers;

      it('defaults off', () => {
        hazardous().should.equal(false);
      });

      it('toggles on', () => {
        const stateBefore = false;
        const action      = { type: ACTION_TYPES.TOGGLE_HAZARDOUS };
        deepFreeze(stateBefore);

        hazardous(stateBefore, action).should.equal(true);
      });

      it('toggles off', () => {
        const stateBefore = true;
        const action      = { type: ACTION_TYPES.TOGGLE_HAZARDOUS };
        deepFreeze(stateBefore);

        hazardous(stateBefore, action).should.equal(false);
      });
    });

    describe('Temperature Controlled Reducer', () => {
      const { temperatureControlled } = cargoReducers;

      it('defaults off', () => {
        temperatureControlled().should.equal(false);
      });

      it('toggles on', () => {
        const stateBefore = false;
        const action      = { type: ACTION_TYPES.TOGGLE_TEMPERATURE_CONTROLLED };
        deepFreeze(stateBefore);

        temperatureControlled(stateBefore, action).should.equal(true);
      });

      it('toggles off', () => {
        const stateBefore = true;
        const action      = { type: ACTION_TYPES.TOGGLE_TEMPERATURE_CONTROLLED };
        deepFreeze(stateBefore);

        temperatureControlled(stateBefore, action).should.equal(false);
      });
    });
  });
}
