import * as ACTION_TYPES from '../actions/actionTypes';
import { changeProp } from './reducer-utils';

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
