import { set } from 'lodash/fp';
import * as ACTION_TYPES from '../../actions/actionTypes';

export const defaultUserProfileState = {
  name: '',
  emailAddress: '',
  branch: '',
};

export const userProfile = (state = defaultUserProfileState, action = { type: '' }) => {
  switch (action.type) {
    case ACTION_TYPES.LOAD_USER_PROFILE:
      if (action.userProfile) {
        return {
          name: action.userProfile.name || defaultUserProfileState.name,
          emailAddress: action.userProfile.emailAddress || defaultUserProfileState.emailAddress,
          branch: action.userProfile.branch || defaultUserProfileState.branch,
        };
      }
      return defaultUserProfileState;
    case ACTION_TYPES.SET_USER_PROFILE_NAME:
      return set('name', action.name, state);
    case ACTION_TYPES.SET_USER_PROFILE_EMAIL_ADDRESS:
      return set('emailAddress', action.emailAddress, state);
    case ACTION_TYPES.SET_USER_PROFILE_BRANCH:
      return set('branch', action.branch, state);
    default:
      return state;
  }
};
