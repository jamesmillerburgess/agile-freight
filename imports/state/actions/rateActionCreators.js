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
export const toggleRateIsSplitByCargoType = makeActionCreator(
  TYPES.TOGGLE_RATE_IS_SPLIT_BY_CARGO_TYPE,
);
export const setRateBasis = makeActionCreator(
  TYPES.SET_RATE_BASIS, 'basis', 'cargoType',
);
export const addRateRange = makeActionCreator(
  TYPES.ADD_RATE_RANGE,
  'id',
  'range',
  'cargoType',
);
export const setRateRangeUnitPrice = makeActionCreator(
  TYPES.SET_RATE_RANGE_UNIT_PRICE,
  'id',
  'unitPrice',
);
export const setRateRangeMaximumUnits = makeActionCreator(
  TYPES.SET_RATE_RANGE_MAXIMUM_UNITS,
  'id',
  'maximumUnits',
);
export const removeRateRange = makeActionCreator(
  TYPES.REMOVE_RATE_RANGE,
  'id',
);
export const setRateCurrency = makeActionCreator(
  TYPES.SET_RATE_CURRENCY,
  'currency',
);
export const setRateMinimumAmount = makeActionCreator(
  TYPES.SET_RATE_MINIMUM_AMOUNT,
  'minimumAmount',
  'cargoType',
);
