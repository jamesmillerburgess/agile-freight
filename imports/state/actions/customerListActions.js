import { makeActionCreator } from './actionUtils';
import * as ACTION_TYPES from './actionTypes';

// CUSTOMER LIST
export const setCustomerListFilter = makeActionCreator(
  ACTION_TYPES.SET_CUSTOMER_LIST_FILTER,
  'filter',
);
