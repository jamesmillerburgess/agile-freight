import { combineReducers } from 'redux';

import { cargo } from './cargoReducers';

import { changeProp } from './reducer-utils';
import * as ACTION_TYPES from '../actions/actionTypes';

const defaultMovementState = {
  pickup: {
    locationType: 'port',
    country: '',
    postalCode: '',
    portCode: '',
  },
  delivery: {
    locationType: 'port',
    country: '',
    postalCode: '',
    portCode: '',
  },
};

export const movement = (state = defaultMovementState, action = { type: '' }) => {
  switch (action.type) {
    case ACTION_TYPES.SET_PICKUP_LOCATION_TYPE:
      return changeProp(state, 'pickup', changeProp(state.pickup, 'locationType', action.locationType));
    case ACTION_TYPES.SET_PICKUP_COUNTRY:
      return changeProp(state, 'pickup', changeProp(state.pickup, 'country', action.country));
    case ACTION_TYPES.SET_PICKUP_POSTAL_CODE:
      return changeProp(state, 'pickup', changeProp(state.pickup, 'postalCode', action.postalCode));
    case ACTION_TYPES.SET_PICKUP_PORT_CODE:
      return changeProp(state, 'pickup', changeProp(state.pickup, 'portCode', action.portCode));
    case ACTION_TYPES.SET_DELIVERY_LOCATION_TYPE:
      return changeProp(state, 'delivery', changeProp(state.delivery, 'locationType', action.locationType));
    case ACTION_TYPES.SET_DELIVERY_COUNTRY:
      return changeProp(state, 'delivery', changeProp(state.delivery, 'country', action.country));
    case ACTION_TYPES.SET_DELIVERY_POSTAL_CODE:
      return changeProp(state, 'delivery', changeProp(state.delivery, 'postalCode', action.postalCode));
    case ACTION_TYPES.SET_DELIVERY_PORT_CODE:
      return changeProp(state, 'delivery', changeProp(state.delivery, 'portCode', action.portCode));
    default:
      return state;
  }
};

export const otherServices = (state  = { insurance: false, customsClearance: false },
                              action = { type: '' }) => {
  switch (action.type) {
    case ACTION_TYPES.TOGGLE_INSURANCE:
      return changeProp(state, 'insurance', !state.insurance);
    case ACTION_TYPES.TOGGLE_CUSTOMS_CLEARANCE:
      return changeProp(state, 'customsClearance', !state.customsClearance);
    default:
      return state;
  }
};

export const newQuote = combineReducers({ cargo, movement, otherServices });
