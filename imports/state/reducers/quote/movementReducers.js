import * as ACTION_TYPES from '../../actions/actionTypes';
import { changeProp } from '../reducer-utils';

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
  let newState = {};
  switch (action.type) {
    case ACTION_TYPES.LOAD_QUOTE:
      newState = action.quote.movement || defaultMovementState;
      break;
    case ACTION_TYPES.SET_PICKUP_LOCATION_TYPE:
      newState = changeProp(state, 'pickup', changeProp(state.pickup, 'locationType', action.locationType));
      break;
    case ACTION_TYPES.SET_PICKUP_LOCATION_NAME:
      newState = changeProp(state, 'pickup', changeProp(state.pickup, 'locationName', action.locationName));
      break;
    case ACTION_TYPES.SET_PICKUP_COUNTRY:
      newState = changeProp(state, 'pickup', changeProp(state.pickup, 'country', action.country));
      if (action.country !== state.pickup.country) {
        newState.pickup.location = '';
      }
      break;
    case ACTION_TYPES.SET_PICKUP_LOCATION:
      newState = changeProp(state, 'pickup', changeProp(state.pickup, 'location', action.location));
      break;
    case ACTION_TYPES.SET_DELIVERY_LOCATION_TYPE:
      newState = changeProp(state, 'delivery', changeProp(state.delivery, 'locationType', action.locationType));
      break;
    case ACTION_TYPES.SET_DELIVERY_LOCATION_NAME:
      newState = changeProp(state, 'delivery', changeProp(state.delivery, 'locationName', action.locationName));
      break;
    case ACTION_TYPES.SET_DELIVERY_COUNTRY:
      newState = changeProp(state, 'delivery', changeProp(state.delivery, 'country', action.country));
      if (action.country !== state.delivery.country) {
        newState.delivery.location = '';
      }
      break;
    case ACTION_TYPES.SET_DELIVERY_LOCATION:
      newState = changeProp(state, 'delivery', changeProp(state.delivery, 'location', action.location));
      break;
    default:
      newState = state;
  }
  return newState;
};
