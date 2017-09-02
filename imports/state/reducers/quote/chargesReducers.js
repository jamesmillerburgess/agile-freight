import { concat, set } from 'lodash/fp';
import { setPropAtId } from '../reducer-utils';
import { getUpdatedFXConversions } from '../../../ui/quoteUtils';

import * as ACTION_TYPES from '../../actions/actionTypes';

export const chargeLines = (
  state = [],
  action = { type: '' },
  parentState = {},
) => {
  let newState = [];
  switch (action.type) {
    case ACTION_TYPES.ADD_CHARGE_LINE:
      newState = concat(action.chargeLine, state);
      break;
    case ACTION_TYPES.REMOVE_CHARGE_LINE:
      newState = state.filter(a => a.id !== action.id);
      break;
    case ACTION_TYPES.SET_CHARGE_LINE_CODE:
      newState = setPropAtId(state, 'code', action.id, action.code);
      break;
    case ACTION_TYPES.SET_CHARGE_LINE_NAME:
      newState = setPropAtId(state, 'name', action.id, action.name);
      break;
    case ACTION_TYPES.SET_CHARGE_LINE_SELECTED_RATE:
      newState =
        setPropAtId(state, 'selectedRate', action.id, action.selectedRate);
      break;
    case ACTION_TYPES.SET_CHARGE_LINE_BASIS:
      newState = setPropAtId(state, 'basis', action.id, action.basis);
      break;
    case ACTION_TYPES.SET_CHARGE_LINE_UNITS:
      newState = setPropAtId(state, 'units', action.id, action.units);
      break;
    case ACTION_TYPES.SET_CHARGE_LINE_UNIT_PRICE:
      newState =
        setPropAtId(state, 'unitPrice', action.id, action.unitPrice);
      break;
    case ACTION_TYPES.SET_CHARGE_LINE_CURRENCY:
      newState = setPropAtId(
        state,
        'currency',
        action.id,
        action.currency,
      );
      break;
    default:
      newState = state;
  }
  return newState.map((chargeLine) => {
    const res = { ...chargeLine };
    let minimumAmount = 0;
    if (chargeLine.selectedRate && chargeLine.selectedRate !== 'custom') {
      minimumAmount =
        chargeLine.applicableSellRates[chargeLine.selectedRate].minimumAmount ||
        0;
    }
    let amount = (chargeLine.units || 0) * (chargeLine.unitPrice || 0);
    if (amount < minimumAmount) {
      amount = minimumAmount;
    }
    res.amount = amount;
    if (chargeLine.currency === parentState.currency) {
      res.finalAmount = res.amount;
    } else if (
      parentState.fxConversions &&
      parentState.fxConversions[chargeLine.currency] &&
      parentState.fxConversions[chargeLine.currency].rate
    ) {
      res.finalAmount =
        res.amount *
        parentState.fxConversions[chargeLine.currency].rate;
    } else {
      res.finalAmount = 0;
    }
    return res;
  });
};

export const fxConversions = (state = {}, action = { type: '' }) => {
  let newState = Object.assign(state.fxConversions || {}, {});
  switch (action.type) {
    case ACTION_TYPES.SET_FX_CONVERSION_RATE:
      newState = set(
        action.currency,
        set('rate', action.rate, newState[action.currency]),
        newState,
      );
      break;
    case ACTION_TYPES.LOAD_QUOTE:
    case ACTION_TYPES.SET_CHARGE_LINE_CURRENCY:
    case ACTION_TYPES.REMOVE_CHARGE_LINE:
    case ACTION_TYPES.SET_QUOTE_CURRENCY:
      newState = getUpdatedFXConversions(state);
      break;
    default:
      break;
  }
  return newState;
};

export const chargeTotals = arr =>
  arr.reduce((acc, val) => {
    const res = { ...acc };
    switch (val.group) {
      case 'Origin':
        res.totalOriginCharges += val.finalAmount;
        break;
      case 'International':
        res.totalInternationalCharges += val.finalAmount;
        break;
      case 'Destination':
        res.totalDestinationCharges += val.finalAmount;
        break;
      default:
        break;
    }
    res.totalCharges += val.finalAmount;
    return res;
  }, {
    totalOriginCharges: 0,
    totalInternationalCharges: 0,
    totalDestinationCharges: 0,
    totalCharges: 0,
  });

const defaultChargesState = {
  chargeLines: [],
  totalOriginCharges: 0,
  totalInternationalCharges: 0,
  totalDestinationCharges: 0,
  totalCharges: 0,
  currency: '',
};

export const charges = (state = defaultChargesState, action = { type: '' }) => {
  let newState = Object.assign(state, {});
  switch (action.type) {
    case ACTION_TYPES.LOAD_QUOTE:
      newState = action.quote.charges || defaultChargesState;
      break;
    case ACTION_TYPES.SET_CHARGE_NOTES:
      newState = set('notes', action.notes, state);
      break;
    case ACTION_TYPES.SET_QUOTE_CURRENCY:
      newState = set('currency', action.currency, state);
      break;
    case ACTION_TYPES.SET_FX_CONVERSION_RATE:
      newState = set(
        'fxConversions',
        set(
          action.currency,
          set('rate', action.rate, state.fxConversions[action.currency]),
          state.fxConversions,
        ),
        state,
      );
      break;
    default:
      newState = state;
  }
  newState.chargeLines =
    chargeLines(newState.chargeLines, action, newState);
  newState.fxConversions = fxConversions(newState, action);
  const totals = chargeTotals(newState.chargeLines);
  return {
    ...newState,
    ...totals,
  };
};
