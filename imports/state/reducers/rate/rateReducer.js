import { omit, set, flow } from 'lodash/fp';
import * as ACTION_TYPES from '../../actions/actionTypes';

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
  containerizedMinimumAmount: 0,
  ranges: {},
  currency: '',
};

export const rate = (state = defaultRateState, action = { type: '' }) => {
  let newState;
  switch (action.type) {
    case ACTION_TYPES.LOAD_RATE:
      return action.rate || defaultRateState;
    case ACTION_TYPES.SET_RATE_TYPE:
      return set('type', action.rateType, state);
    case ACTION_TYPES.SET_RATE_CHARGE_CODE:
      return set('chargeCode', action.chargeCode, state);
    case ACTION_TYPES.SET_RATE_LEVEL:
      return set('level', action.level, state);
    case ACTION_TYPES.SET_RATE_ROUTE:
      return set('route', action.route, state);
    case ACTION_TYPES.TOGGLE_RATE_IS_SPLIT_BY_CARGO_TYPE:
      return set('isSplitByCargoType', !state.isSplitByCargoType, state);
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
    case ACTION_TYPES.TOGGLE_RATE_IS_ANY_PRICE_FIXED:
      return set('isAnyPriceFixed', !state.isAnyPriceFixed, state);
    case ACTION_TYPES.TOGGLE_RATE_IS_LOOSE_PRICE_FIXED:
      return set('isLoosePriceFixed', !state.isLoosePriceFixed, state);
    case ACTION_TYPES.TOGGLE_RATE_IS_CONTAINERIZED_PRICE_FIXED:
      return set('isContainerizedPriceFixed', !state.isContainerizedPriceFixed, state);
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
      const ranges = state.ranges || [];
      const anyRanges = state.anyRanges || [];
      const looseRanges = state.looseRanges || [];
      const containerizedRanges = state.containerizedRanges || [];
      const idFilter = a => a !== action.id;

      return flow(
        set('ranges', omit(action.id, ranges)),
        set('anyRanges', anyRanges.filter(idFilter)),
        set('looseRanges', looseRanges.filter(idFilter)),
        set('containerizedRanges', containerizedRanges.filter(idFilter)),
      )(state);
    case ACTION_TYPES.SET_RATE_CURRENCY:
      return set('currency', action.currency, state);
    default:
      return state;
  }
};
