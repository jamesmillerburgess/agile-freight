/* eslint-env mocha */
/* eslint-disable func-names, prefer-arrow-callback */

import { chai } from 'meteor/practicalmeteor:chai';

import { updateCargo } from './cargo-utils';

describe('Cargo Utilities', function () {
  chai.should();

  describe('Update Cargo Function', function () {
    it('works with an empty object', function () {
      const cargo = {};
      const updatedCargo = updateCargo(cargo);
      updatedCargo.descriptionOfGoods.should.equal('');
      updatedCargo.packageLines.should.eql([]);
      updatedCargo.totalPackages.should.equal(0);
      updatedCargo.totalPackageType.should.equal('');
      updatedCargo.totalGrossWeight.should.equal(0);
      updatedCargo.totalVolume.should.equal(0);
    });

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
      updatedCargo.totalPackages.should.equal(2);
      updatedCargo.totalGrossWeight.should.equal(4);
      updatedCargo.totalVolume.should.equal(6);
    });

    it('deals with mixed package types correctly', function () {
      const cargo = {
        packageLines: [
          { type: 'Package' },
          { type: 'Box' },
        ],
      };
      const updatedCargo = updateCargo(cargo);
      updatedCargo.totalPackageType.should.equal('Mixed Types');
    });

    it('ignores blank package types when determining the total package type', function () {
      const cargo = {
        packageLines: [
          { type: 'Package' },
          { type: '' },
        ],
      };
      const updatedCargo = updateCargo(cargo);
      updatedCargo.totalPackageType.should.equal('Package');
    });

    it('gives a blank total package type when all types are blank', function () {
      const cargo = {
        packageLines: [
          { type: '' },
          { type: '' },
        ],
      };
      const updatedCargo = updateCargo(cargo);
      updatedCargo.totalPackageType.should.equal('');
    });

    it('maintains the description of goods value', function () {
      const cargo = {
        descriptionOfGoods: 'description',
        packageLines: [{}],
      };
      const updatedCargo = updateCargo(cargo);
      updatedCargo.descriptionOfGoods.should.equal('description');
    });
  });
});
