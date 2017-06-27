/* eslint-env mocha */
/* eslint-disable func-names, prefer-arrow-callback */

import { Meteor } from 'meteor/meteor';
import { chai } from 'meteor/practicalmeteor:chai';
import deepFreeze from 'deep-freeze';

import { otherServices } from './otherServicesReducers';
import * as ACTION_TYPES from '../../actions/actionTypes';

if (Meteor.isClient) {
  describe('Other Services Reducer', () => {
    chai.should();
    it('loads the otherServices section of a quote', () => {
      const otherServicesToLoad = {
        insurance: true,
        customsClearance: false,
      };
      const action = { type: ACTION_TYPES.LOAD_QUOTE, quote: { otherServices: otherServicesToLoad } };
      otherServices({}, action).should.eql(otherServicesToLoad);
    });
    it('defaults initial values', () => {
      const stateAfter = { insurance: false, customsClearance: false };

      otherServices().should.eql(stateAfter);
    });
    it('toggles customs clearance', () => {
      const stateBefore = { insurance: false, customsClearance: false };
      const action = { type: ACTION_TYPES.TOGGLE_CUSTOMS_CLEARANCE };
      const stateAfter = { insurance: false, customsClearance: true };
      deepFreeze(stateBefore);

      otherServices(stateBefore, action).should.eql(stateAfter);
    });
    it('toggles export customs clearance', () => {
      const stateBefore = { insurance: false, exportCustomsClearance: false };
      const action = { type: ACTION_TYPES.TOGGLE_EXPORT_CUSTOMS_CLEARANCE };
      const stateAfter = { insurance: false, exportCustomsClearance: true };
      deepFreeze(stateBefore);
      otherServices(stateBefore, action).should.eql(stateAfter);
    });
    it('toggles import customs clearance', () => {
      const stateBefore = { insurance: false, importCustomsClearance: false };
      const action = { type: ACTION_TYPES.TOGGLE_IMPORT_CUSTOMS_CLEARANCE };
      const stateAfter = { insurance: false, importCustomsClearance: true };
      deepFreeze(stateBefore);
      otherServices(stateBefore, action).should.eql(stateAfter);
    });
    it('toggles insurance', () => {
      const stateBefore = { insurance: false, customsClearance: false };
      const action = { type: ACTION_TYPES.TOGGLE_INSURANCE };
      const stateAfter = { insurance: true, customsClearance: false };
      deepFreeze(stateBefore);
      otherServices(stateBefore, action).should.eql(stateAfter);
    });
  });
}
