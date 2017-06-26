import * as ACTION_TYPES from '../../actions/actionTypes';
import { setProp } from '../reducer-utils';

export const defaultRateState = {
  type: '',
  chargeCode: '',
  level: '',
  route: '',
  basis: '',
  unitPrice: 0,
  currency: '',
};

export const rate = (state = defaultRateState, action = { type: '' }) => {
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
    case ACTION_TYPES.SET_RATE_CARRIER:
      return setProp(state, 'carrier', action.carrier);
    case ACTION_TYPES.SET_RATE_BASIS:
      return setProp(state, 'basis', action.basis);
    case ACTION_TYPES.SET_RATE_UNIT_PRICE:
      return setProp(state, 'unitPrice', action.unitPrice);
    case ACTION_TYPES.SET_RATE_CURRENCY:
      return setProp(state, 'currency', action.currency);
    default:
      return state;
  }
};
