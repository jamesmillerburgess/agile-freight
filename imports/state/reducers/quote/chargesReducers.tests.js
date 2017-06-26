/* eslint-env mocha */
/* eslint-disable func-names, prefer-arrow-callback */

import { Meteor } from 'meteor/meteor';
import { chai } from 'meteor/practicalmeteor:chai';
import deepFreeze from 'deep-freeze';

import * as chargesReducers from './chargesReducers';
import * as ACTION_TYPES from '../../actions/actionTypes';

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
          chargeLines: [
            {
              group: 'Origin',
              id: 'a',
              code: 'b',
              name: 'c',
              rate: 'd',
              units: 1,
              unitPrice: 2,
              currency: 'e',
              amount: 2,
              finalAmount: 2,
            },
          ],
          fxConversions: { e: { rate: 1 } },
          totalOriginCharges: 2,
          totalInternationalCharges: 0,
          totalDestinationCharges: 0,
          totalCharges: 2,
          currency: 'f',
        };
        const action = {
          type: ACTION_TYPES.LOAD_QUOTE,
          quote: { charges: chargesToLoad },
        };

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
              currency: 'e',
            },
            {
              group: 'International',
              id: 'a',
              code: 'b',
              name: 'c',
              rate: 'd',
              units: 1,
              unitPrice: 3,
              currency: 'e',
            },
            {
              group: 'Destination',
              id: 'a',
              code: 'b',
              name: 'c',
              rate: 'd',
              units: 1,
              unitPrice: 4,
              currency: 'e',
            },
          ],
          currency: 'f',
          fxConversions: { e: { rate: 1 } },
        };
        const action = {
          type: ACTION_TYPES.LOAD_QUOTE,
          quote: { charges: chargesToLoad },
        };
        const stateAfter = charges({}, action);

        stateAfter.chargeLines[0].amount.should.equal(2);
        stateAfter.chargeLines[1].amount.should.equal(3);
        stateAfter.chargeLines[2].amount.should.equal(4);
        stateAfter.chargeLines[0].finalAmount.should.equal(2);
        stateAfter.chargeLines[1].finalAmount.should.equal(3);
        stateAfter.chargeLines[2].finalAmount.should.equal(4);
        stateAfter.totalOriginCharges.should.equal(2);
        stateAfter.totalInternationalCharges.should.equal(3);
        stateAfter.totalDestinationCharges.should.equal(4);
        stateAfter.totalCharges.should.equal(9);
      });

      it('changes the notes', () => {
        const stateBefore = { notes: 'a' };
        const action = { type: ACTION_TYPES.SET_CHARGE_NOTES, notes: 'b' };

        charges(stateBefore, action).notes.should.equal('b');
      });

      it('changes the quote currency', () => {
        const stateBefore = { currency: 'a' };
        const action = {
          type: ACTION_TYPES.SET_QUOTE_CURRENCY,
          currency: 'b',
        };
        charges(stateBefore, action).currency.should.equal('b');
      });

      it('calculates amounts only after updating individual components of ' +
         'the calculation', () => {
        const stateBefore = {
          chargeLines: [
            {
              group: 'Origin',
              id: 'a',
              code: 'b',
              name: 'c',
              rate: 'd',
              units: 1,
              unitPrice: 2,
              currency: 'e',
              finalAmount: 4,
            },
          ],
          currency: 'f',
          fxConversions: { e: { rate: 2 } },
        };
        const action = {
          type: ACTION_TYPES.SET_FX_CONVERSION_RATE,
          currency: 'e',
          rate: 1,
        };
        const stateAfter = charges(stateBefore, action);

        stateAfter.chargeLines[0].amount.should.equal(2);
        stateAfter.chargeLines[0].finalAmount.should.equal(2);
        stateAfter.totalOriginCharges.should.equal(2);
        stateAfter.totalCharges.should.equal(2);
      });
    });

    describe('Charge Lines Reducer', () => {
      const { chargeLines } = chargesReducers;

      it('adds a charge line', () => {
        const stateBefore = [];
        const chargeLine = { group: 'Origin' };
        const action = { type: ACTION_TYPES.ADD_CHARGE_LINE, chargeLine };
        deepFreeze(stateBefore);
        const stateAfter = chargeLines(stateBefore, action);

        stateAfter.length.should.equal(1);
        stateAfter[0].group.should.equal('Origin');
      });

      it('keeps the specified unit price currency if one is provided', () => {
        const stateBefore = [];
        const parentState = { currency: 'a' };
        const chargeLine = { group: 'Origin', currency: 'b' };
        const action = { type: ACTION_TYPES.ADD_CHARGE_LINE, chargeLine };
        deepFreeze(stateBefore);
        const stateAfter = chargeLines(stateBefore, action, parentState);

        stateAfter[0].currency.should.equal('b');
      });

      it(
        'sets the rate basis to shipment and defaults the units when adding a new charge line',
        () => {
          const stateBefore = [];
          const chargeLine = { group: 'Origin', currency: 'b' };
          const action = { type: ACTION_TYPES.ADD_CHARGE_LINE, chargeLine };
          deepFreeze(stateBefore);
          const stateAfter = chargeLines(stateBefore, action);

          stateAfter[0].rate.should.equal('Shipment');
          stateAfter[0].units.should.equal(1);
        },
      );

      it('removes a charge line with the specified id', () => {
        const stateBefore = [
          { id: 'a', group: 'Origin' },
          { id: 'b', group: 'Destination' },
        ];
        const action = { type: ACTION_TYPES.REMOVE_CHARGE_LINE, id: 'a' };
        deepFreeze(stateBefore);
        const stateAfter = chargeLines(stateBefore, action);

        stateAfter.length.should.equal(1);
        stateAfter[0].group.should.equal('Destination');
      });

      it('changes the code at the charge line with the specified id', () => {
        const stateBefore = [{ id: 0, code: 'a' }, { id: 1, code: 'c' }];
        const action = {
          type: ACTION_TYPES.SET_CHARGE_LINE_CODE,
          id: 0,
          code: 'b',
        };
        deepFreeze(stateBefore);

        chargeLines(stateBefore, action)[0].code.should.equal('b');
        chargeLines(stateBefore, action)[1].code.should.equal('c');
      });

      it('changes the name at the charge line with the specified id', () => {
        const stateBefore = [{ id: 0, name: 'a' }, { id: 2, name: 'c' }];
        const action = {
          type: ACTION_TYPES.SET_CHARGE_LINE_NAME,
          id: 0,
          name: 'b',
        };
        deepFreeze(stateBefore);

        chargeLines(stateBefore, action)[0].name.should.equal('b');
        chargeLines(stateBefore, action)[1].name.should.equal('c');
      });

      it('changes the selected rate at the charge line with the specified ' +
         'id', () => {
        const stateBefore = [{ id: 0, selectedRate: 'a' }];
        const action = {
          type: ACTION_TYPES.SET_CHARGE_LINE_SELECTED_RATE,
          id: 0,
          selectedRate: 'custom',
        };
        deepFreeze(stateBefore);
        chargeLines(stateBefore, action)[0].selectedRate.should.equal('custom');
      });

      it(
        'changes the basis at at the charge line with the specified id',
        () => {
          const stateBefore = [{ id: 0, basis: 'a' }, { id: 1, basis: 'c' }];
          const action = {
            type: ACTION_TYPES.SET_CHARGE_LINE_BASIS,
            id: 0,
            basis: 'b',
          };
          deepFreeze(stateBefore);

          chargeLines(stateBefore, action)[0].basis.should.equal('b');
          chargeLines(stateBefore, action)[1].basis.should.equal('c');
        },
      );

      it(
        'sets the units to 1 when the basis is changed to \'Shipment\'',
        () => {
          const stateBefore = [{ id: 0, basis: 'a' }];
          const action = {
            type: ACTION_TYPES.SET_CHARGE_LINE_BASIS,
            id: 0,
            basis: 'Shipment',
          };
          deepFreeze(stateBefore);

          chargeLines(stateBefore, action)[0].units.should.equal(1);
        },
      );

      it(
        'sets the units to the total KG when the basis is changed to \'KG\'',
        () => {
          const stateBefore = [{ id: 0, rate: 'a' }];
          const action = {
            type: ACTION_TYPES.SET_CHARGE_LINE_BASIS,
            id: 0,
            basis: 'KG',
          };
          const quoteState = { cargo: { totalWeight: 10, weightUOM: 'kg' } };
          deepFreeze(stateBefore);

          chargeLines(
            stateBefore,
            action,
            {},
            quoteState,
          )[0].units.should.equal(10);
        },
      );

      it(
        'sets the units to the total CBM when the basis is changed to \'CBM\'',
        () => {
          const stateBefore = [{ id: 0, basis: 'a' }];
          const action = {
            type: ACTION_TYPES.SET_CHARGE_LINE_BASIS,
            id: 0,
            basis: 'CBM',
          };
          const quoteState = { cargo: { totalVolume: 10, weightUOM: 'cbm' } };
          deepFreeze(stateBefore);

          chargeLines(
            stateBefore,
            action,
            {},
            quoteState,
          )[0].units.should.equal(10);
        },
      );

      it(
        'sets the units to the total containers when the basis is changed to \'Container\'',
        () => {
          const stateBefore = [{ id: 0, basis: 'a' }];
          const action = {
            type: ACTION_TYPES.SET_CHARGE_LINE_BASIS,
            id: 0,
            basis: 'Container',
          };
          const quoteState = { cargo: { totalContainers: 10 } };
          deepFreeze(stateBefore);

          chargeLines(
            stateBefore,
            action,
            {},
            quoteState,
          )[0].units.should.equal(10);
        },
      );

      it(
        'sets the units to the total TEU when the basis is changed to \'TEU\'',
        () => {
          const stateBefore = [{ id: 0, basis: 'a' }];
          const action = {
            type: ACTION_TYPES.SET_CHARGE_LINE_BASIS,
            id: 0,
            basis: 'TEU',
          };
          const quoteState = { cargo: { totalTEU: 10 } };
          deepFreeze(stateBefore);

          chargeLines(
            stateBefore,
            action,
            {},
            quoteState,
          )[0].units.should.equal(10);
        },
      );

      it(
        'sets the units to the total packages when the basis is changed to \'Package\'',
        () => {
          const stateBefore = [{ id: 0, basis: 'a' }];
          const action = {
            type: ACTION_TYPES.SET_CHARGE_LINE_BASIS,
            id: 0,
            basis: 'Package',
          };
          const quoteState = { cargo: { totalPackages: 10 } };
          deepFreeze(stateBefore);

          chargeLines(
            stateBefore,
            action,
            {},
            quoteState,
          )[0].units.should.equal(10);
        },
      );

      it('changes the units at the charge line with the specified id', () => {
        const stateBefore = [{ id: 'a', units: 1 }, { id: 'b', units: 3 }];
        const action = {
          type: ACTION_TYPES.SET_CHARGE_LINE_UNITS,
          id: 'a',
          units: 2,
        };
        deepFreeze(stateBefore);

        chargeLines(stateBefore, action)[0].units.should.equal(2);
        chargeLines(stateBefore, action)[1].units.should.equal(3);
      });

      it(
        'changes the unit price at the charge line with the specified id',
        () => {
          const stateBefore = [
            { id: 'a', unitPrice: 1 }, {
              id: 'b',
              unitPrice: 3,
            },
          ];
          const action = {
            type: ACTION_TYPES.SET_CHARGE_LINE_UNIT_PRICE,
            id: 'a',
            unitPrice: 2,
          };
          deepFreeze(stateBefore);

          chargeLines(stateBefore, action)[0].unitPrice.should.equal(2);
          chargeLines(stateBefore, action)[1].unitPrice.should.equal(3);
        },
      );

      it(
        'changes the unit price currency at the charge line with the specified id',
        () => {
          const stateBefore = [
            { id: 'a', unitPriceCrrency: 'a' }, {
              id: 'b',
              currency: 'c',
            },
          ];
          const action = {
            type: ACTION_TYPES.SET_CHARGE_LINE_CURRENCY,
            id: 'a',
            currency: 'b',
          };
          deepFreeze(stateBefore);

          chargeLines(
            stateBefore,
            action,
          )[0].currency.should.equal('b');
          chargeLines(
            stateBefore,
            action,
          )[1].currency.should.equal('c');
        },
      );

      it('auto-calculates the amount', () => {
        const stateBefore = [{ units: 1, unitPrice: 2 }];
        deepFreeze(stateBefore);

        chargeLines(stateBefore)[0].amount.should.equal(2);
      });

      it('auto-calculates the final amount', () => {
        const stateBefore = [
          {
            units: 1,
            unitPrice: 2,
            currency: 'a',
          },
        ];
        const parentState = {
          currency: 'b',
          fxConversions: { a: { rate: 2 } },
        };
        deepFreeze(stateBefore);
        const stateAfter = chargeLines(stateBefore, {}, parentState);

        stateAfter[0].finalAmount.should.equal(4);
      });

      it(
        'uses 1 as the fx rate when the unit price currency equals the quote currency',
        () => {
          const stateBefore = [
            {
              units: 1,
              unitPrice: 2,
              currency: 'a',
            },
          ];
          const parentState = { currency: 'a' };
          deepFreeze(stateBefore);
          const stateAfter = chargeLines(stateBefore, {}, parentState);

          stateAfter[0].finalAmount.should.equal(2);
        },
      );
    });

    describe('FX Conversions Reducer', () => {
      const { fxConversions } = chargesReducers;

      it('changes the rate with the specified currency', () => {
        const stateBefore = {
          fxConversions: {
            a: { rate: 1 },
            b: { rate: 3 },
          },
        };
        const action = {
          type: ACTION_TYPES.SET_FX_CONVERSION_RATE,
          currency: 'a',
          rate: 2,
        };
        deepFreeze(stateBefore);

        fxConversions(stateBefore, action).a.rate.should.equal(2);
        fxConversions(stateBefore, action).b.rate.should.equal(3);
      });

      it(
        'adds an active conversion when a new currency is added to the charge lines',
        () => {
          const stateBefore = {
            currency: 'a',
            fxConversions: { b: {} },
            chargeLines: [
              { currency: 'b' },
              { currency: 'c' },
            ],
          };
          let action = { type: ACTION_TYPES.SET_CHARGE_LINE_CURRENCY };
          deepFreeze(stateBefore);
          let stateAfter = fxConversions(stateBefore, action);

          stateAfter.should.have.property('c');
          stateAfter.c.active.should.equal(true);

          action = { type: ACTION_TYPES.REMOVE_CHARGE_LINE };
          stateAfter = fxConversions(stateBefore, action);

          stateAfter.should.have.property('c');
          stateAfter.c.active.should.equal(true);
        },
      );

      it(
        'deactivates any conversions which are no longer used, but maintain the rate',
        () => {
          const stateBefore = {
            currency: 'a',
            fxConversions: { b: { rate: 1 } },
            chargeLines: [{ currency: 'c' }],
          };
          let action = { type: ACTION_TYPES.SET_CHARGE_LINE_CURRENCY };
          deepFreeze(stateBefore);

          let stateAfter = fxConversions(stateBefore, action);
          stateAfter.should.have.property('b');
          stateAfter.b.active.should.equal(false);

          action = { type: ACTION_TYPES.REMOVE_CHARGE_LINE };
          deepFreeze(stateBefore);

          stateAfter = fxConversions(stateBefore, action);
          stateAfter.should.have.property('b');
          stateAfter.b.active.should.equal(false);
          stateAfter.b.rate.should.equal(1);
        },
      );

      it(
        'activates any preexisting currencies which are now being used again and keep the same rate',
        () => {
          const stateBefore = {
            currency: 'a',
            fxConversions: { b: { active: false, rate: 1 } },
            chargeLines: [{ currency: 'b' }],
          };
          let action = { type: ACTION_TYPES.SET_CHARGE_LINE_CURRENCY };
          deepFreeze(stateBefore);

          let stateAfter = fxConversions(stateBefore, action);
          stateAfter.should.have.property('b');
          stateAfter.b.active.should.equal(true);
          stateAfter.b.rate.should.equal(1);

          action = { type: ACTION_TYPES.REMOVE_CHARGE_LINE };

          stateAfter = fxConversions(stateBefore, action);
          stateAfter.should.have.property('b');
          stateAfter.b.active.should.equal(true);
          stateAfter.b.rate.should.equal(1);
        },
      );

      it('ignores any currencies equal to the quote currency', () => {
        const stateBefore = {
          currency: 'a',
          fxConversions: {},
          chargeLines: [{ currency: 'a' }],
        };
        let action = { type: ACTION_TYPES.SET_CHARGE_LINE_CURRENCY };
        deepFreeze(stateBefore);
        let stateAfter = fxConversions(stateBefore, action);

        stateAfter.should.not.have.property('a');

        action = { type: ACTION_TYPES.REMOVE_CHARGE_LINE };
        stateAfter = fxConversions(stateBefore, action);

        stateAfter.should.not.have.property('a');
      });

      it('updates when the quote currency changes', () => {
        const stateBefore = {
          currency: 'b',
          fxConversions: { b: { rate: 1 } },
          chargeLines: [{ currency: 'b' }],
        };
        const action = {
          type: ACTION_TYPES.SET_QUOTE_CURRENCY,
          currency: 'b',
        };
        deepFreeze(stateBefore);
        const stateAfter = fxConversions(stateBefore, action);

        stateAfter.b.active.should.equal(false);
      });

      it('defaults an empty object', () => {
        fxConversions().should.eql({});
      });
    });

    describe('Charges Totals Function', () => {
      const { chargeTotals } = chargesReducers;
      it('calculates the total charges by group', () => {
        const stateBefore = [
          { group: 'Origin', finalAmount: 1 },
          { group: 'Origin', finalAmount: 1 },
          { group: 'International', finalAmount: 2 },
          { group: 'International', finalAmount: 2 },
          { group: 'Destination', finalAmount: 3 },
          { group: 'Destination', finalAmount: 3 },
        ];
        deepFreeze(stateBefore);
        const stateAfter = chargeTotals(stateBefore);

        stateAfter.totalOriginCharges.should.equal(2);
        stateAfter.totalInternationalCharges.should.equal(4);
        stateAfter.totalDestinationCharges.should.equal(6);
      });

      it('calculates the total charges overall', () => {
        const stateBefore = [
          { group: 'Origin', finalAmount: 1 },
          { group: 'Origin', finalAmount: 1 },
          { group: 'International', finalAmount: 2 },
          { group: 'International', finalAmount: 2 },
          { group: 'Destination', finalAmount: 3 },
          { group: 'Destination', finalAmount: 3 },
        ];
        deepFreeze(stateBefore);
        const stateAfter = chargeTotals(stateBefore);

        stateAfter.totalCharges.should.equal(12);
      });
    });
  });
}
