import { set } from 'lodash/fp';
import * as ACTION_TYPES from '../../actions/actionTypes';

export const defaultCustomerListState = {
  filter: '',
};

export const customerList = (state = defaultCustomerListState, action = { type: '' }) => {
  switch (action.type) {
    case ACTION_TYPES.SET_CUSTOMER_LIST_FILTER:
      return set('filter', action.filter, state);
    default:
      return state;
  }
};
