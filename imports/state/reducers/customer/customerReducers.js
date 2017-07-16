import { set } from 'lodash/fp';
import * as ACTION_TYPES from '../../actions/actionTypes';

export const defaultCustomerState = {
  name: '',
  address: '',
  emailAddress: '',
  currency: '',
  branch: '',
};

export const customer = (state = defaultCustomerState, action = { type: '' }) => {
  let newState = {};
  switch (action.type) {
    case ACTION_TYPES.LOAD_CUSTOMER:
      if (action.customer) {
        newState = {
          name: action.customer.name || defaultCustomerState.name,
          address: action.customer.address || defaultCustomerState.address,
          emailAddress: action.customer.emailAddress || defaultCustomerState.emailAddress,
          currency: action.customer.currency || defaultCustomerState.currency,
          branch: action.customer.branch || defaultCustomerState.branch,
        };
      } else {
        newState = defaultCustomerState;
      }
      break;
    case ACTION_TYPES.SET_CUSTOMER_NAME:
      newState = set('name', action.name, state);
      break;
    case ACTION_TYPES.SET_CUSTOMER_ADDRESS:
      newState = set('address', action.address, state);
      break;
    case ACTION_TYPES.SET_CUSTOMER_EMAIL_ADDRESS:
      newState = set('emailAddress', action.emailAddress, state);
      break;
    case ACTION_TYPES.SET_CUSTOMER_CURRENCY:
      newState = set('currency', action.currency, state);
      break;
    case ACTION_TYPES.SET_CUSTOMER_BRANCH:
      newState = set('branch', action.branch, state);
      break;
    default:
      newState = state;
  }
  return newState;
};
