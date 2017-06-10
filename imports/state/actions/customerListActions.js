import { makeActionCreator } from './action-utils';
import * as ACTION_TYPES from './actionTypes';

// CUSTOMER LIST
export const setCustomerListFilter = makeActionCreator(
  ACTION_TYPES.SET_CUSTOMER_LIST_FILTER,
  'filter',
);
