import { makeActionCreator } from './actionUtils';
import * as ACTION_TYPES from './actionTypes';

// BRANCH
export const loadBranch = makeActionCreator(
  ACTION_TYPES.LOAD_BRANCH,
  'branch',
);
export const setBranchName = makeActionCreator(
  ACTION_TYPES.SET_BRANCH_NAME,
  'name',
);
export const setBranchCode = makeActionCreator(
  ACTION_TYPES.SET_BRANCH_CODE,
  'code',
);
