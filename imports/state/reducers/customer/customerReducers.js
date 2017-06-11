import * as ACTION_TYPES from '../../actions/actionTypes';
import { changeProp } from '../reducer-utils';

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
      newState = changeProp(state, 'name', action.name);
      break;
    case ACTION_TYPES.SET_CUSTOMER_ADDRESS:
      newState = changeProp(state, 'address', action.address);
      break;
    case ACTION_TYPES.SET_CUSTOMER_EMAIL_ADDRESS:
      newState = changeProp(state, 'emailAddress', action.emailAddress);
      break;
    case ACTION_TYPES.SET_CUSTOMER_CURRENCY:
      newState = changeProp(state, 'currency', action.currency);
      break;
    case ACTION_TYPES.SET_CUSTOMER_BRANCH:
      newState = changeProp(state, 'branch', action.branch);
      break;
    default:
      newState = state;
  }
  return newState;
};
