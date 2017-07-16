import { set } from 'lodash/fp';
import * as ACTION_TYPES from '../../actions/actionTypes';

export const defaultBranchState = {
  name: '',
};

export const branch = (state = defaultBranchState, action = { type: '' }) => {
  switch (action.type) {
    case ACTION_TYPES.LOAD_BRANCH:
      return action.branch;
    case ACTION_TYPES.SET_BRANCH_NAME:
      return set('name', action.name, state);
    default:
      return state;
  }
};
