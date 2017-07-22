import { cargo } from '../cargo/cargoReducers';

export const shipment = (state = {}, action) => ({
  cargo: cargo(state.cargo || {}, action),
});
