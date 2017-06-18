/* eslint-env mocha */
/* eslint-disable func-names, prefer-arrow-callback */

import { Meteor } from 'meteor/meteor';
import { chai } from 'meteor/practicalmeteor:chai';
import deepFreeze from 'deep-freeze';

import { customerList, defaultCustomerListState } from './customerListReducers';
import * as ACTION_TYPES from '../../actions/actionTypes';

if (Meteor.isClient) {
  describe('Customer List Reducer', () => {
    chai.should();

    it('defaults each field to blank', () => {
      customerList().should.eql(defaultCustomerListState);
      defaultCustomerListState.filter.should.equal('');
    });

    it('set the filter', () => {
      const stateBefore = { filter: 'a' };
      const action = { type: ACTION_TYPES.SET_CUSTOMER_LIST_FILTER, filter: 'b' };
      deepFreeze(stateBefore);
      customerList(stateBefore, action).filter.should.equal('b');
    });
  });
}
