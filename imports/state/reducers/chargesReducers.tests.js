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

    describe('Combined Charges Reducer', () => {
      const { charges } = chargesReducers;

      it('defaults initial values', () => {
        const stateAfter = {
          chargeLines: [],
          fxConversions: {},
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
        const stateAfter    = charges({}, action);

        stateAfter.chargeLines[0].amount.should.equal(2);
        stateAfter.chargeLines[1].amount.should.equal(3);
        stateAfter.chargeLines[2].amount.should.equal(4);
        stateAfter.totalOriginCharges.should.equal(2);
        stateAfter.totalInternationalCharges.should.equal(3);
        stateAfter.totalDestinationCharges.should.equal(4);
        stateAfter.totalCharges.should.equal(9);
      });

      it('changes the notes', () => {
        const stateBefore = { notes: 'a' };
        const action      = { type: ACTION_TYPES.SET_CHARGE_NOTES, notes: 'b' };

        charges(stateBefore, action).notes.should.equal('b');
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

      it('removes a charge line with the specified id', () => {
        const stateBefore = [
          { id: 'a', group: 'Origin' },
          { id: 'b', group: 'Destination' },
        ];
        const action      = { type: ACTION_TYPES.REMOVE_CHARGE_LINE, id: 'a' };
        deepFreeze(stateBefore);
        const stateAfter = chargeLines(stateBefore, action);

        stateAfter.length.should.equal(1);
        stateAfter[0].group.should.equal('Destination');
      });

      it('changes the code at the charge line with the specified id', () => {
        const stateBefore = [{ id: 0, code: 'a' }, { id: 1, code: 'c' }];
        const action      = { type: ACTION_TYPES.SET_CHARGE_LINE_CODE, id: 0, code: 'b' };
        deepFreeze(stateBefore);

        chargeLines(stateBefore, action)[0].code.should.equal('b');
        chargeLines(stateBefore, action)[1].code.should.equal('c');
      });

      it('changes the name at the charge line with the specified id', () => {
        const stateBefore = [{ id: 0, name: 'a' }, { id: 2, name: 'c' }];
        const action      = { type: ACTION_TYPES.SET_CHARGE_LINE_NAME, id: 0, name: 'b' };
        deepFreeze(stateBefore);

        chargeLines(stateBefore, action)[0].name.should.equal('b');
        chargeLines(stateBefore, action)[1].name.should.equal('c');
      });

      it('changes the rate at at the charge line with the specified id', () => {
        const stateBefore = [{ id: 0, rate: 'a' }, { id: 1, rate: 'c' }];
        const action      = { type: ACTION_TYPES.SET_CHARGE_LINE_RATE, id: 0, rate: 'b' };
        deepFreeze(stateBefore);

        chargeLines(stateBefore, action)[0].rate.should.equal('b');
        chargeLines(stateBefore, action)[1].rate.should.equal('c');
      });

      it('changes the units at the charge line with the specified id', () => {
        const stateBefore = [{ id: 'a', units: 1 }, { id: 'b', units: 3 }];
        const action      = { type: ACTION_TYPES.SET_CHARGE_LINE_UNITS, id: 'a', units: 2 };
        deepFreeze(stateBefore);

        chargeLines(stateBefore, action)[0].units.should.equal(2);
        chargeLines(stateBefore, action)[1].units.should.equal(3);
      });

      it('changes the unit price at the charge line with the specified id', () => {
        const stateBefore = [{ id: 'a', unitPrice: 1 }, { id: 'b', unitPrice: 3 }];
        const action      = {
          type: ACTION_TYPES.SET_CHARGE_LINE_UNIT_PRICE,
          id: 'a',
          unitPrice: 2,
        };
        deepFreeze(stateBefore);

        chargeLines(stateBefore, action)[0].unitPrice.should.equal(2);
        chargeLines(stateBefore, action)[1].unitPrice.should.equal(3);
      });

      it('changes the unit price currency at the charge line with the specified id', () => {
        const stateBefore = [{ id: 'a', unitPriceCrrency: 'a' }, {
          id: 'b',
          unitPriceCurrency: 'c'
        }];
        const action      = {
          type: ACTION_TYPES.SET_CHARGE_LINE_UNIT_PRICE_CURRENCY,
          id: 'a',
          unitPriceCurrency: 'b',
        };
        deepFreeze(stateBefore);

        chargeLines(stateBefore, action)[0].unitPriceCurrency.should.equal('b');
        chargeLines(stateBefore, action)[1].unitPriceCurrency.should.equal('c');
      });

      it('auto-calculates the amount', () => {
        const stateBefore = [{ units: 1, unitPrice: 2 }];
        deepFreeze(stateBefore);

        chargeLines(stateBefore)[0].amount.should.equal(2);
      });
    });

    describe('FX Conversions Reducer', () => {
      const { fxConversions } = chargesReducers;

      it('changes the rate with the specified currency', () => {
        const stateBefore = { fxConversions: { a: { rate: 1 }, b: { rate: 3 } } };
        const action      = { type: ACTION_TYPES.SET_FX_CONVERSION_RATE, currency: 'a', rate: 2 };
        deepFreeze(stateBefore);

        fxConversions(stateBefore, action).a.rate.should.equal(2);
        fxConversions(stateBefore, action).b.rate.should.equal(3);
      });

      it('adds an active conversion when a new currency is added to the charge lines', () => {
        const stateBefore = {
          currency: 'a',
          fxConversions: { b: {} },
          chargeLines: [{ unitPriceCurrency: 'b' }, { unitPriceCurrency: 'c' }],
        };
        let action        = { type: ACTION_TYPES.SET_CHARGE_LINE_UNIT_PRICE_CURRENCY };
        deepFreeze(stateBefore);
        let stateAfter = fxConversions(stateBefore, action);

        stateAfter.should.have.property('c');
        stateAfter.c.active.should.equal(true);

        action = { type: ACTION_TYPES.REMOVE_CHARGE_LINE };
        stateAfter = fxConversions(stateBefore, action);

        stateAfter.should.have.property('c');
        stateAfter.c.active.should.equal(true);
      });

      it('deactivates any conversions which are no longer used, but maintain the rate', () => {
        const stateBefore = {
          currency: 'a',
          fxConversions: { b: { rate: 1 } },
          chargeLines: [{ unitPriceCurrency: 'c' }],
        };
        let action      = { type: ACTION_TYPES.SET_CHARGE_LINE_UNIT_PRICE_CURRENCY };
        deepFreeze(stateBefore);

        let stateAfter = fxConversions(stateBefore, action);
        stateAfter.should.have.property('b');
        stateAfter.b.active.should.equal(false);

        action      = { type: ACTION_TYPES.REMOVE_CHARGE_LINE };
        deepFreeze(stateBefore);

        stateAfter = fxConversions(stateBefore, action);
        stateAfter.should.have.property('b');
        stateAfter.b.active.should.equal(false);
        stateAfter.b.rate.should.equal(1);
      });

      it('activates any preexisting currencies which are now being used again and keep the same rate', () => {
        const stateBefore = {
          currency: 'a',
          fxConversions: { b: { active: false, rate: 1 } },
          chargeLines: [{ unitPriceCurrency: 'b' }],
        };
        let action      = { type: ACTION_TYPES.SET_CHARGE_LINE_UNIT_PRICE_CURRENCY };
        deepFreeze(stateBefore);

        let stateAfter = fxConversions(stateBefore, action);
        stateAfter.should.have.property('b');
        stateAfter.b.active.should.equal(true);
        stateAfter.b.rate.should.equal(1);

        action      = { type: ACTION_TYPES.REMOVE_CHARGE_LINE };

        stateAfter = fxConversions(stateBefore, action);
        stateAfter.should.have.property('b');
        stateAfter.b.active.should.equal(true);
        stateAfter.b.rate.should.equal(1);
      });

      it('ignores any currencies equal to the quote currency', () => {
        const stateBefore = {
          currency: 'a',
          fxConversions: {},
          chargeLines: [{ unitPriceCurrency: 'a' }],
        };
        let action      = { type: ACTION_TYPES.SET_CHARGE_LINE_UNIT_PRICE_CURRENCY };
        deepFreeze(stateBefore);
        let stateAfter = fxConversions(stateBefore, action);

        stateAfter.should.not.have.property('a');

        action      = { type: ACTION_TYPES.REMOVE_CHARGE_LINE };
        stateAfter = fxConversions(stateBefore, action);

        stateAfter.should.not.have.property('a');
      });

      it('defaults an empty object', () => {
        fxConversions().should.eql({});
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
