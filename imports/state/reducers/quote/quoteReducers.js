import { cargo } from '../cargo/cargoReducers';
import { movement } from '../movement/movementReducers';
import { otherServices } from './otherServicesReducers';
import { charges } from './chargesReducers';
import { email } from './emailReducers';

import * as ACTION_TYPES from '../../actions/actionTypes';

export const reference = (state, action) => {
  if (action.type === ACTION_TYPES.LOAD_QUOTE) {
    return action.quote.reference;
  }
  return state;
};

export const quote = (state = {}, action = { type: '' }) => ({
  reference: reference(state.reference || '', action),
  cargo: cargo(state.cargo || {}, action),
  movement: movement(state ? state.movement : null, action),
  otherServices: otherServices(state.otherServices || {}, action),
  charges: charges(state.charges || {}, action, state),
  email: email(state ? state.email : null, action),
});
