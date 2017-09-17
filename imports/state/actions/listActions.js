import { makeActionCreator } from './actionUtils';
import * as ACTION_TYPES from './actionTypes';

// CUSTOMER LIST
export const setListFilter = makeActionCreator(
  ACTION_TYPES.SET_LIST_FILTER,
  'filter',
);
