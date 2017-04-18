/* eslint-env mocha */
/* eslint-disable func-names, prefer-arrow-callback */

import { chai } from 'meteor/practicalmeteor:chai';

import { updateCharges } from './charges-utils';

describe('Charges Utilities', function () {
  chai.should();

  describe('Update Charges Function', function () {
    it('works with an empty object', function () {
      const updatedCharges = updateCharges({});
      updatedCharges.chargeLines.should.equal([]);
      updatedCharges.totalAmount.should.equal(0);
      updatedCharges.totalCurrency.should.equal('');
    });

    it('calculates the total amount correctly', function () {
      const charges = {
        chargeLines: [
          { amount: 1 },
          { amount: 1 },
        ],
      };
      const updatedCharges = updateCharges(charges);
      updatedCharges.totalAmount.should.equal(2);
    });

    it('calculates the total currency correctly', function () {
      const charges = {
        chargeLines: [
          { currency: 'USD' },
          { currency: 'USD' },
        ],
      };
      const updatedCharges = updateCharges(charges);
      updatedCharges.totalCurrency.should.equal('USD');
    });

    it('deals with mixed currencies correctly', function () {
      const charges = {
        chargeLines: [
          { currency: 'USD' },
          { currency: 'CHF' },
        ],
      };
      const updatedCharges = updateCharges(charges);
      updatedCharges.totalCurrency.should.equal('N/A');
    });

    it('ignores blank currencies when determining the total currency', function () {
      const charges = {
        chargeLines: [
          { currency: 'USD' },
          { currency: '' },
        ],
      };
      const updatedCharges = updateCharges(charges);
      updatedCharges.totalCurrency.should.equal('USD');
    });

    it('gives a blank total currency when all currencies are blank', function () {
      const charges = {
        chargeLines: [
          { currency: '' },
          { currency: '' },
        ],
      };
      const updatedCharges = updateCharges(charges);
      updatedCharges.totalCurrency.should.equal('');
    });
  });
});
