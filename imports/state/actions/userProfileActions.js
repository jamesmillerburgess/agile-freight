import { makeActionCreator } from './action-utils';
import * as ACTION_TYPES from './actionTypes';

// CUSTOMER
export const loadUserProfile            = makeActionCreator(
  ACTION_TYPES.LOAD_USER_PROFILE,
  'userProfile',
);
export const setUserProfileName         = makeActionCreator(
  ACTION_TYPES.SET_USER_PROFILE_NAME,
  'name',
);
export const setUserProfileEmailAddress      = makeActionCreator(
  ACTION_TYPES.SET_USER_PROFILE_EMAIL_ADDRESS,
  'address',
);
export const setUserProfileBranch       = makeActionCreator(
  ACTION_TYPES.SET_USER_PROFILE_BRANCH,
  'branch',
);
