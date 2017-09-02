import { makeActionCreator } from './actionUtils';
import * as ACTION_TYPES from './actionTypes';

// EMAIL
export const toggleFilter = makeActionCreator(
  ACTION_TYPES.TOGGLE_FILTER,
  'filter',
);
