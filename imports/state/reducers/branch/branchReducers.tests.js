/* eslint-env mocha */
/* eslint-disable func-names, prefer-arrow-callback */

import { Meteor } from 'meteor/meteor';
import { chai } from 'meteor/practicalmeteor:chai';
import deepFreeze from 'deep-freeze';

import { branch, defaultBranchState } from './branchReducers';
import * as ACTION_TYPES from '../../actions/actionTypes';

if (Meteor.isClient) {
  describe('Branch Reducer', () => {
    chai.should();
    it('defaults to the default', () => {
      branch().should.eql(defaultBranchState);
    });
    it('loads a branch', () => {
      const action = { type: ACTION_TYPES.LOAD_BRANCH, branch: { name: 'a' } };
      branch({}, action).name.should.equal('a');
    });
    it('sets the branch name', () => {
      const stateBefore = { name: 'a' };
      const action = { type: ACTION_TYPES.SET_BRANCH_NAME, name: 'b' };
      deepFreeze(stateBefore);
      branch(stateBefore, action).name.should.equal('b');
    });
    it('sets the branch code', () => {
      const stateBefore = { code: 'a' };
      const action = { type: ACTION_TYPES.SET_BRANCH_CODE, code: 'b' };
      deepFreeze(stateBefore);
      branch(stateBefore, action).code.should.equal('b');
    });
  });
}
