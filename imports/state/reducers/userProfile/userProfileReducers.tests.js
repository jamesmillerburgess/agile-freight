/* eslint-env mocha */
/* eslint-disable func-names, prefer-arrow-callback */

import { Meteor } from 'meteor/meteor';
import { chai } from 'meteor/practicalmeteor:chai';
import deepFreeze from 'deep-freeze';

import { userProfile, defaultUserProfileState } from './userProfileReducers';
import * as ACTION_TYPES from '../../actions/actionTypes';

if (Meteor.isClient) {
  describe('User Profile Reducer', () => {
    chai.should();

    it('defaults to the default state', () => {
      userProfile().should.eql(defaultUserProfileState);
    });

    it('loads the user profile', () => {
      const userProfileToLoad = {
        name: 'a',
        emailAddress: 'c',
        branch: 'e',
      };
      const action         = {
        type: ACTION_TYPES.LOAD_USER_PROFILE,
        userProfile: userProfileToLoad,
      };

      userProfile({}, action).should.eql(userProfileToLoad);
    });

    it('loads the default user profile if none is provided', () => {
      const action = { type: ACTION_TYPES.LOAD_USER_PROFILE };
      userProfile({}, action).should.eql(defaultUserProfileState);
    });

    it('sets the name', () => {
      const stateBefore = { name: 'a' };
      const action = { type: ACTION_TYPES.SET_USER_PROFILE_NAME, name: 'b' };
      deepFreeze(stateBefore);
      userProfile(stateBefore, action).name.should.equal('b');
    });

    it('sets the email address', () => {
      const stateBefore = { emailAddress: 'a' };
      const action = { type: ACTION_TYPES.SET_USER_PROFILE_EMAIL_ADDRESS, emailAddress: 'b' };
      deepFreeze(stateBefore);
      userProfile(stateBefore, action).emailAddress.should.equal('b');
    });

    it('sets the branch', () => {
      const stateBefore = { branch: 'a' };
      const action = { type: ACTION_TYPES.SET_USER_PROFILE_BRANCH, branch: 'b' };
      deepFreeze(stateBefore);
      userProfile(stateBefore, action).branch.should.equal('b');
    });
  });
}
