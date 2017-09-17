/* eslint-env mocha */
/* eslint-disable func-names, prefer-arrow-callback */

import { Meteor } from 'meteor/meteor';
import { chai } from 'meteor/practicalmeteor:chai';
import deepFreeze from 'deep-freeze';

import { list, defaultListState } from './listReducers';
import * as ACTION_TYPES from '../../actions/actionTypes';

if (Meteor.isClient) {
  describe('List Reducer', () => {
    chai.should();
    it('defaults each field to blank', () => {
      list().should.eql(defaultListState);
      defaultListState.filter.should.equal('');
    });
    it('sets the list filter', () => {
      const stateBefore = { filter: 'a' };
      const action = { type: ACTION_TYPES.SET_LIST_FILTER, filter: 'b' };
      deepFreeze(stateBefore);
      list(stateBefore, action).filter.should.equal('b');
    });
  });
}
