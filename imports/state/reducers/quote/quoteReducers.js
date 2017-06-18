import { cargo } from './cargoReducers';
import { movement } from './movementReducers';
import { otherServices } from './otherServicesReducers';
import { charges } from './chargesReducers';
import { email } from './emailReducers';

export const quote = (state = {}, action) => ({
  cargo: cargo(state.cargo || {}, action),
  movement: movement(state ? state.movement : null, action),
  otherServices: otherServices(state.otherServices || {}, action),
  charges: charges(state.charges || {}, action, state),
  email: email(state ? state.email : null, action),
});
