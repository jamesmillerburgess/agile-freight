import { makeActionCreator } from './action-utils';
import * as ACTION_TYPES from './actionTypes';

// BRANCH
export const loadBranch            = makeActionCreator(
  ACTION_TYPES.LOAD_BRANCH,
  'branch',
);
export const setBranchName         = makeActionCreator(
  ACTION_TYPES.SET_BRANCH_NAME,
  'name',
);
