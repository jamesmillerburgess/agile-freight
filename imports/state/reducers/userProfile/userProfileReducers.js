import * as ACTION_TYPES from '../../actions/actionTypes';
import { changeProp } from '../reducer-utils';

export const defaultUserProfileState = {
  name: '',
  emailAddress: '',
  branch: '',
};

export const userProfile = (state = defaultUserProfileState, action = { type: '' }) => {
  let newState = {};
  switch (action.type) {
    case ACTION_TYPES.LOAD_USER_PROFILE:
      if (action.userProfile) {
        newState = {
          name: action.userProfile.name || defaultUserProfileState.name,
          emailAddress: action.userProfile.emailAddress || defaultUserProfileState.emailAddress,
          branch: action.userProfile.branch || defaultUserProfileState.branch,
        };
      } else {
        newState = defaultUserProfileState;
      }
      break;
    case ACTION_TYPES.SET_USER_PROFILE_NAME:
      newState = changeProp(state, 'name', action.name);
      break;
    case ACTION_TYPES.SET_USER_PROFILE_EMAIL_ADDRESS:
      newState = changeProp(state, 'emailAddress', action.emailAddress);
      break;
    case ACTION_TYPES.SET_USER_PROFILE_BRANCH:
      newState = changeProp(state, 'branch', action.branch);
      break;
    default:
      newState = state;
  }
  return newState;
};
