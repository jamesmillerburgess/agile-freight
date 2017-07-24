import { cargo } from '../cargo/cargoReducers';
import { movement } from '../movement/movementReducers';

export const shipment = (state = {}, action) => ({
  cargo: cargo(state.cargo || {}, action),
  movement: movement(state.movement || {}, action),
});
