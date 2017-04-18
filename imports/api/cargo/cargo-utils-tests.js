/* eslint-env mocha */
/* eslint-disable func-names, prefer-arrow-callback */

import { chai } from 'meteor/practicalmeteor:chai';

import { updateCargo } from './cargo-utils';

describe('Cargo Utilities', function () {
  describe('Update Cargo Function', function () {
    it('adds up the totals correctly', function () {
      const cargo = {
        packageLines: [
          {
            num: 1,
            grossWeight: 2,
            volume: 3,
          },
          {
            num: 1,
            grossWeight: 2,
            volume: 3,
          },
        ],
      };
      const updatedCargo = updateCargo(cargo);
      chai.assert.equal(updatedCargo.totalPackages, 2);
      chai.assert.equal(updatedCargo.totalGrossWeight, 4);
      chai.assert.equal(updatedCargo.totalVolume, 6);
    });

    it('determines the deals with mixed package types correctly', function () {
      const cargo = {
        packageLines: [
          { type: 'Package' },
          { type: 'Box' },
        ],
      };
      const updatedCargo = updateCargo(cargo);
      chai.assert.equal(updatedCargo.totalPackageType, 'Mixed Types');
    });

    it('ignores blank package types when determining the total package type', function () {
      const cargo = {
        packageLines: [
          { type: 'Package' },
          { type: '' },
        ],
      };
      const updatedCargo = updateCargo(cargo);
      chai.assert.equal(updatedCargo.totalPackageType, 'Package');
    });

    it('gives a blank total package type when all types are blank', function () {
      const cargo = {
        packageLines: [
          { type: '' },
          { type: '' },
        ],
      };
      const updatedCargo = updateCargo(cargo);
      chai.assert.equal(updatedCargo.totalPackageType, '');
    });

    it('maintains the description of goods', function () {
      const cargo = {
        descriptionOfGoods: 'description ',
        packageLines: [{}],
      };
      const updatedCargo = updateCargo(cargo);
      chai.assert.equal(updatedCargo.descriptionOfGoods, 'description');
    });

    it('still works with an empty object', function () {
      const updatedCargo = updateCargo({});
      chai.assert.equal(updatedCargo.descriptionOfGoods, '');
      chai.assert.equal(updatedCargo.packageLines, []);
      chai.assert.equal(updatedCargo.totalPackages, 0);
      chai.assert.equal(updatedCargo.totalPackageType, '');
      chai.assert.equal(updatedCargo.totalGrossWeight, 0);
      chai.assert.equal(updatedCargo.totalVolume, 0);
    });
  });
});
