import { makeActionCreator } from './actionUtils';
import * as ACTION_TYPES from './actionTypes';

// CUSTOMER
export const loadCustomer            = makeActionCreator(
  ACTION_TYPES.LOAD_CUSTOMER,
  'customer',
);
export const setCustomerName         = makeActionCreator(
  ACTION_TYPES.SET_CUSTOMER_NAME,
  'name',
);
export const setCustomerAddress      = makeActionCreator(
  ACTION_TYPES.SET_CUSTOMER_ADDRESS,
  'address',
);
export const setCustomerEmailAddress = makeActionCreator(
  ACTION_TYPES.SET_CUSTOMER_EMAIL_ADDRESS,
  'emailAddress',
);
export const setCustomerCurrency     = makeActionCreator(
  ACTION_TYPES.SET_CUSTOMER_CURRENCY,
  'currency',
);
export const setCustomerBranch       = makeActionCreator(
  ACTION_TYPES.SET_CUSTOMER_BRANCH,
  'branch',
);
