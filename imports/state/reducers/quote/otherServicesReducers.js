import { setProp } from '../reducer-utils';
import * as ACTION_TYPES from '../../actions/actionTypes';

const otherServicesDefaultState = { insurance: false, customsClearance: false };

export const otherServices = (state  = otherServicesDefaultState,
                              action = { type: '' }) => {
  switch (action.type) {
    case ACTION_TYPES.LOAD_QUOTE:
      return action.quote.otherServices || otherServicesDefaultState;
    case ACTION_TYPES.TOGGLE_INSURANCE:
      return setProp(state, 'insurance', !state.insurance);
    case ACTION_TYPES.TOGGLE_EXPORT_CUSTOMS_CLEARANCE:
      return setProp(state, 'exportCustomsClearance', !state.exportCustomsClearance);
    case ACTION_TYPES.TOGGLE_IMPORT_CUSTOMS_CLEARANCE:
      return setProp(state, 'importCustomsClearance', !state.importCustomsClearance);
    default:
      return state;
  }
};
