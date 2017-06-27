import { makeActionCreator } from './actionUtils';
import * as TYPES from './actionTypes';

export const loadRate = makeActionCreator(TYPES.LOAD_RATE, 'rate');
export const setRateType = makeActionCreator(TYPES.SET_RATE_TYPE, 'rateType');
export const setRateChargeCode = makeActionCreator(
  TYPES.SET_RATE_CHARGE_CODE,
  'chargeCode',
);
export const setRateLevel = makeActionCreator(TYPES.SET_RATE_LEVEL, 'level');
export const setRateRoute = makeActionCreator(TYPES.SET_RATE_ROUTE, 'route');
export const setRateCarrier = makeActionCreator(
  TYPES.SET_RATE_CARRIER,
  'carrier',
);
export const setRateBasis = makeActionCreator(TYPES.SET_RATE_BASIS, 'basis');
export const setRateUnitPrice = makeActionCreator(
  TYPES.SET_RATE_UNIT_PRICE,
  'unitPrice',
);
export const setRateCurrency = makeActionCreator(
  TYPES.SET_RATE_CURRENCY,
  'currency',
);
export const setRateMinumumAmount = makeActionCreator(
  TYPES.SET_RATE_MINIMUM_AMOUNT,
  'minimumAmount',
);
