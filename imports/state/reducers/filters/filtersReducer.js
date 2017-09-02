import { set } from 'lodash/fp';

import * as ACTION_TYPES from '../../actions/actionTypes';

const defaultFiltersState = {
  showActive: true,
  showInactive: false,
  showAir: true,
  showSea: true,
  showRoad: true,
  showBrokerage: true,
};

export const filters = (state = defaultFiltersState, action = { type: '' }) => {
  switch (action.type) {
    case ACTION_TYPES.TOGGLE_FILTER:
      return set(action.filter, !state[action.filter], state);
    default:
      return state;
  }
};
