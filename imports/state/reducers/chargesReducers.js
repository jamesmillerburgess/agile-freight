import { changePropAtId, removeAtId, addToEnd } from './reducer-utils';
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
    default:
      newState = state;
  }
  return newState.map(chargeLine => ({
    ...chargeLine,
    amount: (chargeLine.units || 0) * (chargeLine.unitPrice || 0),
  }));
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
  let newState = {};
  switch (action.type) {
    case ACTION_TYPES.LOAD_QUOTE:
      newState = action.quote.charges;
      break;
    default:
      newState = state;
  }
  newState.chargeLines = chargeLines(newState.chargeLines, action);
  const totals = chargeTotals(newState.chargeLines);
  return {
    ...newState,
    ...totals,
  };
};
