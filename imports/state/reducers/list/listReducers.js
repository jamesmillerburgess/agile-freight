import { set } from 'lodash/fp';
import * as ACTION_TYPES from '../../actions/actionTypes';

export const defaultListState = {
  filter: '',
};

export const list = (state = defaultListState, action = { type: '' }) => {
  switch (action.type) {
    case ACTION_TYPES.SET_LIST_FILTER:
      return set('filter', action.filter, state);
    default:
      return state;
  }
};
