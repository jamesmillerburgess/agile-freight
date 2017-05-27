import { changeProp, changePropAtId, removeAtId, addToEnd } from './reducer-utils';
import { uniqueValues } from '../../ui/statsUtils';

import * as ACTION_TYPES from '../actions/actionTypes';

export const chargeLines = (state = [], action = { type: '' }) => {
  let newState = [];
  switch (action.type) {
    case ACTION_TYPES.ADD_CHARGE_LINE:
      newState = addToEnd(state, action.chargeLine);
      break;
    case ACTION_TYPES.REMOVE_CHARGE_LINE:
      newState = removeAtId(state, action.id);
      break;
    case ACTION_TYPES.SET_CHARGE_LINE_CODE:
      newState = changePropAtId(state, 'code', action.id, action.code);
      break;
    case ACTION_TYPES.SET_CHARGE_LINE_NAME:
      newState = changePropAtId(state, 'name', action.id, action.name);
      break;
    case ACTION_TYPES.SET_CHARGE_LINE_RATE:
      newState = changePropAtId(state, 'rate', action.id, action.rate);
      break;
    case ACTION_TYPES.SET_CHARGE_LINE_UNITS:
      newState = changePropAtId(state, 'units', action.id, action.units);
      break;
    case ACTION_TYPES.SET_CHARGE_LINE_UNIT_PRICE:
      newState = changePropAtId(state, 'unitPrice', action.id, action.unitPrice);
      break;
    case ACTION_TYPES.SET_CHARGE_LINE_UNIT_PRICE_CURRENCY:
      newState = changePropAtId(state, 'unitPriceCurrency', action.id, action.unitPriceCurrency);
      break;
    default:
      newState = state;
  }
  return newState.map(chargeLine => ({
    ...chargeLine,
    amount: (chargeLine.units || 0) * (chargeLine.unitPrice || 0),
  }));
};

export const fxConversions = (state = {}, action = { type: '' }) => {
  let newState = Object.assign(state.fxConversions || {}, {});
  switch (action.type) {
    case ACTION_TYPES.SET_FX_CONVERSION_RATE:
      newState = changeProp(newState, action.currency, changeProp(newState[action.currency], 'rate', action.rate));
      break;
    case ACTION_TYPES.SET_CHARGE_LINE_UNIT_PRICE_CURRENCY:
    case ACTION_TYPES.REMOVE_CHARGE_LINE:
      const currencies = uniqueValues(state.chargeLines, 'unitPriceCurrency');
      currencies.forEach((currency) => {
        if (currency === state.currency) {
          return;
        }
        if (!newState[currency]) {
          newState = changeProp(newState, currency, { active: true });
        } else if (!newState[currency].active) {
          newState = changeProp(newState, currency, changeProp(newState[currency], 'active', true));
        }
      });
      Object.keys(newState).forEach((currency) => {
        if (currencies.indexOf(currency) === -1) {
          newState[currency] = changeProp(newState[currency], 'active', false);
        }
      });
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
        res.totalOriginCharges += val.amount;
        break;
      case 'International':
        res.totalInternationalCharges += val.amount;
        break;
      case 'Destination':
        res.totalDestinationCharges += val.amount;
        break;
      default:
        break;
    }
    res.totalCharges += val.amount;
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
      newState = changeProp(state, 'notes', action.notes);
      break;
    default:
      newState = state;
  }
  newState.chargeLines   = chargeLines(newState.chargeLines, action);
  newState.fxConversions = fxConversions(newState, action);
  newState.fxConversions = fxConversions(newState, action);
  const totals           = chargeTotals(newState.chargeLines);
  return {
    ...newState,
    ...totals,
  };
};
