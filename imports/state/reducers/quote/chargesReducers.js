import {
  itemAtId,
  changeProp,
  changePropAtId,
  removeAtId,
  addToEnd,
} from '../reducer-utils';
import { getUpdatedFXConversions } from '../../../ui/quoteUtils';

import * as ACTION_TYPES from '../../actions/actionTypes';

export const defaultUnits = (rate, cargo) => {
  switch (rate) {
    case 'Shipment':
      return 1;
    case 'KG':
      return cargo.totalWeight;
    case 'CBM':
      return cargo.totalVolume;
    case 'Container':
      return cargo.totalContainers;
    case 'TEU':
      return cargo.totalTEU;
    case 'Package':
      return cargo.totalPackages;
    default:
      return 1;
  }
};

export const chargeLines = (
  state = [],
  action = { type: '' },
  parentState = {},
  quoteState = {},
) => {
  let newState = [];
  switch (action.type) {
    case ACTION_TYPES.ADD_CHARGE_LINE:
      console.log(action.chargeLine);
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
    case ACTION_TYPES.SET_CHARGE_LINE_SELECTED_RATE:
      newState =
        changePropAtId(state, 'selectedRate', action.id, action.selectedRate);
      break;
    case ACTION_TYPES.SET_CHARGE_LINE_BASIS:
      newState = changePropAtId(state, 'basis', action.id, action.basis);
      newState = changePropAtId(
        newState,
        'units',
        action.id,
        defaultUnits(itemAtId(newState, action.id).basis, quoteState.cargo),
      );
      break;
    case ACTION_TYPES.SET_CHARGE_LINE_UNITS:
      newState = changePropAtId(state, 'units', action.id, action.units);
      break;
    case ACTION_TYPES.SET_CHARGE_LINE_UNIT_PRICE:
      newState =
        changePropAtId(state, 'unitPrice', action.id, action.unitPrice);
      break;
    case ACTION_TYPES.SET_CHARGE_LINE_CURRENCY:
      newState = changePropAtId(
        state,
        'currency',
        action.id,
        action.currency,
      );
      break;
    default:
      newState = state;
  }
  console.log(newState);
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
      newState = changeProp(
        newState,
        action.currency,
        changeProp(newState[action.currency], 'rate', action.rate),
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

export const charges = (
  state = defaultChargesState,
  action = { type: '' },
  quoteState,
) => {
  let newState = Object.assign(state, {});
  switch (action.type) {
    case ACTION_TYPES.LOAD_QUOTE:
      newState = action.quote.charges || defaultChargesState;
      break;
    case ACTION_TYPES.SET_CHARGE_NOTES:
      newState = changeProp(state, 'notes', action.notes);
      break;
    case ACTION_TYPES.SET_QUOTE_CURRENCY:
      newState = changeProp(state, 'currency', action.currency);
      break;
    case ACTION_TYPES.SET_FX_CONVERSION_RATE:
      newState =
        changeProp(
          state,
          'fxConversions',
          changeProp(
            state.fxConversions,
            action.currency,
            changeProp(
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
    chargeLines(newState.chargeLines, action, newState, quoteState);
  newState.fxConversions = fxConversions(newState, action);
  const totals = chargeTotals(newState.chargeLines);
  return {
    ...newState,
    ...totals,
  };
};
