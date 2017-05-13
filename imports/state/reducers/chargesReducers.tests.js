/* eslint-env mocha */
/* eslint-disable func-names, prefer-arrow-callback */

import { Meteor } from 'meteor/meteor';
import { chai } from 'meteor/practicalmeteor:chai';
import deepFreeze from 'deep-freeze';

import * as chargesReducers from './chargesReducers';
import * as ACTION_TYPES from '../actions/actionTypes';

if (Meteor.isClient) {
  describe('Charges Reducers', () => {
    chai.should();

    describe('Combined Cargo Reducer', () => {
      const { charges } = chargesReducers;

      it('defaults initial values', () => {
        const stateAfter = {
          chargeLines: [],
          totalOriginCharges: 0,
          totalInternationalCharges: 0,
          totalDestinationCharges: 0,
          totalCharges: 0,
          currency: '',
        };

        charges().should.eql(stateAfter);
      });

      it('loads the charges section of a quote', () => {
        const chargesToLoad = {
          chargeLines: [{
            group: 'Origin',
            id: 'a',
            code: 'b',
            name: 'c',
            rate: 'd',
            units: 1,
            unitPrice: 2,
            amount: 2,
          }],
          totalOriginCharges: 2,
          totalInternationalCharges: 0,
          totalDestinationCharges: 0,
          totalCharges: 2,
          currency: 'e',
        };
        const action        = { type: ACTION_TYPES.LOAD_QUOTE, quote: { charges: chargesToLoad } };

        charges({}, action).should.eql(chargesToLoad);
      });

      it('fills in the missing totals when loading a quote', () => {
        const chargesToLoad = {
          chargeLines: [
            {
              group: 'Origin',
              id: 'a',
              code: 'b',
              name: 'c',
              rate: 'd',
              units: 1,
              unitPrice: 2,
            },
            {
              group: 'International',
              id: 'a',
              code: 'b',
              name: 'c',
              rate: 'd',
              units: 1,
              unitPrice: 3,
            },
            {
              group: 'Destination',
              id: 'a',
              code: 'b',
              name: 'c',
              rate: 'd',
              units: 1,
              unitPrice: 4,
            },
          ],
          currency: 'e',
        };
        const action        = { type: ACTION_TYPES.LOAD_QUOTE, quote: { charges: chargesToLoad } };
        const stateAfter = charges({}, action);
        
        stateAfter.chargeLines[0].amount.should.equal(2);
        stateAfter.chargeLines[1].amount.should.equal(3);
        stateAfter.chargeLines[2].amount.should.equal(4);
        stateAfter.totalOriginCharges.should.equal(2);
        stateAfter.totalInternationalCharges.should.equal(3);
        stateAfter.totalDestinationCharges.should.equal(4);
        stateAfter.totalCharges.should.equal(9);
      });
    });

    describe('Charge Lines Reducer', () => {
      const { chargeLines } = chargesReducers;

      it('adds a charge line', () => {
        const stateBefore = [];
        const chargeLine  = { group: 'Origin' };
        const action      = { type: ACTION_TYPES.ADD_CHARGE_LINE, chargeLine };
        deepFreeze(stateBefore);
        const stateAfter = chargeLines(stateBefore, action);

        stateAfter.length.should.equal(1);
        stateAfter[0].group.should.equal('Origin');
      });

      it('removes a charge line at the specified index', () => {
        const stateBefore = [
          { group: 'Origin' },
          { group: 'Destination' },
        ];
        const action      = { type: ACTION_TYPES.REMOVE_CHARGE_LINE, index: 0 };
        deepFreeze(stateBefore);
        const stateAfter = chargeLines(stateBefore, action);

        stateAfter.length.should.equal(1);
        stateAfter[0].group.should.equal('Destination');
      });

      it('changes the code at the specified index', () => {
        const stateBefore = [{ code: 'a' }];
        const action      = { type: ACTION_TYPES.SET_CHARGE_LINE_CODE, index: 0, code: 'b' };
        deepFreeze(stateBefore);

        chargeLines(stateBefore, action)[0].code.should.equal('b');
      });

      it('changes the name at the specified index', () => {
        const stateBefore = [{ name: 'a' }];
        const action      = { type: ACTION_TYPES.SET_CHARGE_LINE_NAME, index: 0, name: 'b' };
        deepFreeze(stateBefore);

        chargeLines(stateBefore, action)[0].name.should.equal('b');
      });

      it('changes the rate at the specified index', () => {
        const stateBefore = [{ rate: 'a' }];
        const action      = { type: ACTION_TYPES.SET_CHARGE_LINE_RATE, index: 0, rate: 'b' };
        deepFreeze(stateBefore);

        chargeLines(stateBefore, action)[0].rate.should.equal('b');
      });

      it('changes the units at the specified index', () => {
        const stateBefore = [{ units: 1 }];
        const action      = { type: ACTION_TYPES.SET_CHARGE_LINE_UNITS, index: 0, units: 2 };
        deepFreeze(stateBefore);

        chargeLines(stateBefore, action)[0].units.should.equal(2);
      });

      it('changes the unit price at the specified index', () => {
        const stateBefore = [{ unitPrice: 1 }];
        const action      = {
          type: ACTION_TYPES.SET_CHARGE_LINE_UNIT_PRICE,
          index: 0,
          unitPrice: 2,
        };
        deepFreeze(stateBefore);

        chargeLines(stateBefore, action)[0].unitPrice.should.equal(2);
      });

      it('auto-calculates the amount', () => {
        const stateBefore = [{ units: 1, unitPrice: 2 }];
        deepFreeze(stateBefore);

        chargeLines(stateBefore)[0].amount.should.equal(2);
      });
    });

    describe('Charges Totals Function', () => {
      const { chargeTotals } = chargesReducers;
      it('calculates the total charges by group', () => {
        const stateBefore = [
          { group: 'Origin', amount: 1 },
          { group: 'Origin', amount: 1 },
          { group: 'International', amount: 2 },
          { group: 'International', amount: 2 },
          { group: 'Destination', amount: 3 },
          { group: 'Destination', amount: 3 },
        ];
        deepFreeze(stateBefore);
        const stateAfter = chargeTotals(stateBefore);

        stateAfter.totalOriginCharges.should.equal(2);
      });

      it('calculates the total charges overall', () => {
        const stateBefore = [
          { group: 'Origin', amount: 1 },
          { group: 'Origin', amount: 1 },
          { group: 'International', amount: 2 },
          { group: 'International', amount: 2 },
          { group: 'Destination', amount: 3 },
          { group: 'Destination', amount: 3 },
        ];
        deepFreeze(stateBefore);
        const stateAfter = chargeTotals(stateBefore);

        stateAfter.totalCharges.should.equal(12);
      });
    });
  });
}