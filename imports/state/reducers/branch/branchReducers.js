import * as ACTION_TYPES from '../../actions/actionTypes';
import { changeProp } from '../reducer-utils';

export const defaultBranchState = {
  name: '',
};

export const branch = (state = defaultBranchState, action = { type: '' }) => {
  let newState = {};
  switch (action.type) {
    case ACTION_TYPES.LOAD_BRANCH:
      newState = action.branch;
      break;
    case ACTION_TYPES.SET_BRANCH_NAME:
      newState = changeProp(state, 'name', action.name);
      break;
    default:
      newState = state;
  }
  return newState;
};
