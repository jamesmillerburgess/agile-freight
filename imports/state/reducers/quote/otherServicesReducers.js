import { changeProp } from '../reducer-utils';
import * as ACTION_TYPES from '../../actions/actionTypes';

const otherServicesDefaultState = { insurance: false, customsClearance: false };

export const otherServices = (state  = otherServicesDefaultState,
                              action = { type: '' }) => {
  switch (action.type) {
    case ACTION_TYPES.LOAD_QUOTE:
      return action.quote.otherServices || otherServicesDefaultState;
    case ACTION_TYPES.TOGGLE_INSURANCE:
      return changeProp(state, 'insurance', !state.insurance);
    case ACTION_TYPES.TOGGLE_CUSTOMS_CLEARANCE:
      return changeProp(state, 'customsClearance', !state.customsClearance);
    default:
      return state;
  }
};
