import { omit, set } from 'lodash/fp';
import * as ACTION_TYPES from '../../actions/actionTypes';
import { setProp } from '../reducer-utils';

export const defaultRateState = {
  type: '',
  chargeCode: '',
  level: '',
  route: '',
  isSplitByCargoType: false,
  anyBasis: '',
  anyRanges: [],
  anyMinimumAmount: 0,
  looseBasis: '',
  looseRanges: [],
  looseMinimumAmount: 0,
  containerizedBasis: '',
  containerizedRanges: [],
  containerizedMinumumAmount: 0,
  ranges: {},
  currency: '',
};

export const rate = (state = defaultRateState, action = { type: '' }) => {
  let newState;
  switch (action.type) {
    case ACTION_TYPES.LOAD_RATE:
      return action.rate;
    case ACTION_TYPES.SET_RATE_TYPE:
      return setProp(state, 'type', action.rateType);
    case ACTION_TYPES.SET_RATE_CHARGE_CODE:
      return setProp(state, 'chargeCode', action.chargeCode);
    case ACTION_TYPES.SET_RATE_LEVEL:
      return setProp(state, 'level', action.level);
    case ACTION_TYPES.SET_RATE_ROUTE:
      return setProp(state, 'route', action.route);
    case ACTION_TYPES.TOGGLE_RATE_IS_SPLIT_BY_CARGO_TYPE:
      return setProp(state, 'isSplitByCargoType', !state.isSplitByCargoType);
    case ACTION_TYPES.SET_RATE_BASIS:
      switch (action.cargoType) {
        case 'any':
          return set('anyBasis', action.basis, state);
        case 'loose':
          return set('looseBasis', action.basis, state);
        case 'containerized':
          return set('containerizedBasis', action.basis, state);
        default:
          return state;
      }
    case ACTION_TYPES.SET_RATE_MINIMUM_AMOUNT:
      switch (action.cargoType) {
        case 'any':
          return set('anyMinimumAmount', action.minimumAmount, state);
        case 'loose':
          return set('looseMinimumAmount', action.minimumAmount, state);
        case 'containerized':
          return set('containerizedMinimumAmount', action.minimumAmount, state);
        default:
          return state;
      }
    case ACTION_TYPES.ADD_RATE_RANGE:
      newState = set(['ranges', action.id], action.range, state);
      switch (action.cargoType) {
        case 'any':
          return set('anyRanges', [...state.anyRanges, action.id], newState);
        case 'loose':
          return set(
            'looseRanges',
            [...state.looseRanges, action.id],
            newState,
          );
        case 'containerized':
          return set(
            'containerizedRanges',
            [...state.containerizedRanges, action.id],
            newState,
          );
        default:
          return newState;
      }
    case ACTION_TYPES.SET_RATE_RANGE_UNIT_PRICE:
      return set(['ranges', action.id, 'unitPrice'], action.unitPrice, state);
    case ACTION_TYPES.SET_RATE_RANGE_MAXIMUM_UNITS:
      return set(
        ['ranges', action.id, 'maximumUnits'],
        action.maximumUnits,
        state,
      );
    case ACTION_TYPES.REMOVE_RATE_RANGE:
      newState = set(
        'ranges',
        omit(action.id, state.ranges),
        state,
      );
      newState = set(
        'anyRanges',
        (state.anyRanges || []).filter(a => a !== action.id),
        newState,
      );
      newState = set(
        'looseRanges',
        (state.looseRanges || []).filter(a => a !== action.id),
        newState,
      );
      newState = set(
        'containerizedRanges',
        (state.containerizedRanges || []).filter(a => a !== action.id),
        newState,
      );
      return newState;
    case ACTION_TYPES.SET_RATE_CURRENCY:
      return setProp(state, 'currency', action.currency);
    default:
      return state;
  }
};
