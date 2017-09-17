import { makeActionCreator } from './actionUtils';
import * as ACTION_TYPES from './actionTypes';

// CUSTOMER
export const loadSupplier = makeActionCreator(
  ACTION_TYPES.LOAD_SUPPLIER,
  'supplier',
);
export const setSupplierName = makeActionCreator(
  ACTION_TYPES.SET_SUPPLIER_NAME,
  'name',
);
export const setSupplierAddress = makeActionCreator(
  ACTION_TYPES.SET_SUPPLIER_ADDRESS,
  'address',
);
export const setSupplierEmailAddress = makeActionCreator(
  ACTION_TYPES.SET_SUPPLIER_EMAIL_ADDRESS,
  'emailAddress',
);
export const setSupplierCurrency = makeActionCreator(
  ACTION_TYPES.SET_SUPPLIER_CURRENCY,
  'currency',
);
export const setSupplierBranch = makeActionCreator(
  ACTION_TYPES.SET_SUPPLIER_BRANCH,
  'branch',
);
