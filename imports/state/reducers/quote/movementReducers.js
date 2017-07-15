import * as ACTION_TYPES from '../../actions/actionTypes';
import { setProp } from '../reducer-utils';

const defaultMovementState = {
  pickup: {
    locationType: '',
    country: '',
    postalCode: '',
    portCode: '',
  },
  delivery: {
    locationType: '',
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
    case ACTION_TYPES.SET_MOVEMENT_MODE:
      newState = setProp(state, 'mode', action.mode);
      if (newState.mode === 'Brokerage') {
        newState = setProp(newState, 'termsOfSale', '');
      }
      break;
    case ACTION_TYPES.SET_MOVEMENT_COMMERCIAL_PARTY:
      newState = setProp(state, 'commercialParty', action.commercialParty);
      break;
    case ACTION_TYPES.SET_MOVEMENT_TERMS_OF_SALE:
      newState = setProp(state, 'termsOfSale', action.termsOfSale);
      break;
    case ACTION_TYPES.SET_CARRIER:
      newState = setProp(state, 'carrier', action.carrier);
      break;
    case ACTION_TYPES.SET_RECEIPT:
      newState = setProp(state, 'receipt', action.receipt);
      break;
    case ACTION_TYPES.SET_DEPARTURE:
      newState = setProp(state, 'departure', action.departure);
      break;
    case ACTION_TYPES.SET_ARRIVAL:
      newState = setProp(state, 'arrival', action.arrival);
      break;
    case ACTION_TYPES.SET_DELIVERY:
      newState = setProp(state, 'delivery', action.delivery);
      break;
    default:
      newState = state;
  }
  return newState;
};
