import { set } from 'lodash/fp';
import * as ACTION_TYPES from '../../actions/actionTypes';

const otherServicesDefaultState = { insurance: false, customsClearance: false };

export const otherServices = (
  state = otherServicesDefaultState,
  action = { type: '' },
) => {
  switch (action.type) {
    case ACTION_TYPES.LOAD_QUOTE:
      return action.quote.otherServices || otherServicesDefaultState;
    case ACTION_TYPES.TOGGLE_INSURANCE:
      return set('insurance', !state.insurance, state);
    case ACTION_TYPES.TOGGLE_EXPORT_CUSTOMS_CLEARANCE:
      return set(
        'exportCustomsClearance',
        !state.exportCustomsClearance,
        state,
      );
    case ACTION_TYPES.TOGGLE_IMPORT_CUSTOMS_CLEARANCE:
      return set(
        'importCustomsClearance',
        !state.importCustomsClearance,
        state,
      );
    default:
      return state;
  }
};
