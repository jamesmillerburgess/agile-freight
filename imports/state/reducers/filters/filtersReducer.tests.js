/* eslint-env mocha */
/* eslint-disable func-names, prefer-arrow-callback */

import { Meteor } from 'meteor/meteor';
import { chai } from 'meteor/practicalmeteor:chai';
import deepFreeze from 'deep-freeze';

import { filters } from './filtersReducer';
import * as ACTION_TYPES from '../../actions/actionTypes';

if (Meteor.isClient) {
  describe('Filters Reducer', () => {
    chai.should();
    it('toggles the filters', () => {
      const stateBefore = { showActive: true };
      const action = { type: ACTION_TYPES.TOGGLE_FILTER, filter: 'showActive' };
      deepFreeze(stateBefore);
      const stateAfter = filters(stateBefore, action);
      stateAfter.showActive.should.equal(false);
      filters(stateAfter, action).showActive.should.equal(true);
    });
  });
}
