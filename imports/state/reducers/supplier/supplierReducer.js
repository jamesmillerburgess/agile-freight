import { set } from 'lodash/fp';
import * as ACTION_TYPES from '../../actions/actionTypes';

export const defaultSupplierState = {
  name: '',
  address: '',
  emailAddress: '',
  currency: '',
  branch: '',
};

export const supplier = (
  state = defaultSupplierState,
  action = { type: '' },
) => {
  switch (action.type) {
    case ACTION_TYPES.LOAD_SUPPLIER:
      return action.supplier || defaultSupplierState;
    case ACTION_TYPES.SET_SUPPLIER_NAME:
      return set('name', action.name, state);
    case ACTION_TYPES.SET_SUPPLIER_ADDRESS:
      return set('address', action.address, state);
    case ACTION_TYPES.SET_SUPPLIER_EMAIL_ADDRESS:
      return set('emailAddress', action.emailAddress, state);
    case ACTION_TYPES.SET_SUPPLIER_CURRENCY:
      return set('currency', action.currency, state);
    case ACTION_TYPES.SET_SUPPLIER_BRANCH:
      return set('branch', action.branch, state);
    default:
      return state;
  }
};
