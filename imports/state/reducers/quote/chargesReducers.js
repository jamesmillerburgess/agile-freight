import {
  setProp,
  setPropAtId,
  removeAtId,
  addToEnd,
} from '../reducer-utils';
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
      newState = addToEnd(state, action.chargeLine);
      break;
    case ACTION_TYPES.REMOVE_CHARGE_LINE:
      newState = removeAtId(state, action.id);
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
    res.amount = (chargeLine.units || 0) * (chargeLine.unitPrice || 0);
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
      newState = setProp(
        newState,
        action.currency,
        setProp(newState[action.currency], 'rate', action.rate),
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
      newState = setProp(state, 'notes', action.notes);
      break;
    case ACTION_TYPES.SET_QUOTE_CURRENCY:
      newState = setProp(state, 'currency', action.currency);
      break;
    case ACTION_TYPES.SET_FX_CONVERSION_RATE:
      newState =
        setProp(
          state,
          'fxConversions',
          setProp(
            state.fxConversions,
            action.currency,
            setProp(
              state.fxConversions[action.currency],
              'rate',
              action.rate,
            ),
          ),
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
