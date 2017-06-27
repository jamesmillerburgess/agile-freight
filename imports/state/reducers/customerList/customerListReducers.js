import * as ACTION_TYPES from '../../actions/actionTypes';
import { setProp } from '../reducer-utils';

export const defaultCustomerListState = {
  filter: '',
};

export const customerList = (state = defaultCustomerListState, action = { type: '' }) => {
  let newState = {};
  switch (action.type) {
    case ACTION_TYPES.SET_CUSTOMER_LIST_FILTER:
      newState = setProp(state, 'filter', action.filter);
      break;
    default:
      newState = state;
  }
  return newState;
};
