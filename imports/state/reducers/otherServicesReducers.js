import { changeProp } from './reducer-utils';
import * as ACTION_TYPES from '../actions/actionTypes';

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
