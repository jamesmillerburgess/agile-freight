import {
  itemAtId,
  changeProp,
  changePropAtId,
  removeAtId,
  addToEnd,
} from '../reducer-utils';
import { uniqueValues } from '../../../ui/statsUtils';
import { APIGlobals } from '../../../api/api-globals';

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
      newState = addToEnd(
        state,
        {
          ...action.chargeLine,
          rate: 'Shipment',
          units: defaultUnits('Shipment'),
        },
      );
      if (!newState[newState.length - 1].currency) {
        newState = changePropAtId(
          newState,
          'currency',
          newState[newState.length - 1].id,
          parentState.currency,
        );
      }
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

export const getUpdatedFXConversions = (charges) => {
  let result = charges.fxConversions;
  const currencies = uniqueValues(charges.chargeLines, 'currency');
  currencies.forEach((currency) => {
    if (currency === charges.currency) {
      if (result[currency]) {
        result = changeProp(
          result,
          currency,
          changeProp(result[currency], 'active', false),
        );
      }
    } else if (!result[currency]) {
      result = changeProp(result, currency, { active: true });
    } else if (!result[currency].active) {
      result = changeProp(
        result,
        currency,
        changeProp(result[currency], 'active', true),
      );
    }
  });
  Object.keys(result).forEach((currency) => {
    if (currencies.indexOf(currency) === -1) {
      result[currency] = changeProp(result[currency], 'active', false);
    }
    if (result[currency].active && !result[currency].rate) {
      result[currency].rate = APIGlobals.fxRates[charges.currency][currency];
    }
  });
  return result;
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
      const currencies = uniqueValues(state.chargeLines, 'currency');
      currencies.forEach((currency) => {
        if (currency === state.currency) {
          if (newState[currency]) {
            newState = changeProp(
              newState,
              currency,
              changeProp(newState[currency], 'active', false),
            );
          }
        } else if (!newState[currency]) {
          newState = changeProp(newState, currency, { active: true });
        } else if (!newState[currency].active) {
          newState = changeProp(
            newState,
            currency,
            changeProp(newState[currency], 'active', true),
          );
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
