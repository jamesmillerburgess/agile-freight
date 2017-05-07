/* eslint-env mocha */
/* eslint-disable func-names, prefer-arrow-callback */

import { Meteor } from 'meteor/meteor';
import { chai } from 'meteor/practicalmeteor:chai';
import deepFreeze from 'deep-freeze';

import { otherServices } from './otherServicesReducers';
import * as ACTION_TYPES from '../actions/actionTypes';

if (Meteor.isClient) {
  describe('Other Services Reducer', () => {
    chai.should();
    it('defaults initial values', () => {
      const stateAfter = { insurance: false, customsClearance: false };

      otherServices().should.eql(stateAfter);
    });

    it('toggles insurance', () => {
      const stateBefore = { insurance: false, customsClearance: false };
      const action = { type: ACTION_TYPES.TOGGLE_INSURANCE };
      const stateAfter = { insurance: true, customsClearance: false };
      deepFreeze(stateBefore);

      otherServices(stateBefore, action).should.eql(stateAfter);
    });

    it('toggles customs clearance', () => {
      const stateBefore = { insurance: false, customsClearance: false };
      const action = { type: ACTION_TYPES.TOGGLE_CUSTOMS_CLEARANCE };
      const stateAfter = { insurance: false, customsClearance: true };
      deepFreeze(stateBefore);

      otherServices(stateBefore, action).should.eql(stateAfter);
    });
  });
}
