/* eslint-env mocha */
/* eslint-disable func-names, prefer-arrow-callback */

import { Meteor } from 'meteor/meteor';
import { chai } from 'meteor/practicalmeteor:chai';

import { shipment } from './shipmentReducer';
import * as ACTION_TYPES from '../../actions/actionTypes';

if (Meteor.isClient) {
  describe('Shipment Reducers', () => {
    chai.should();
    it('defaults the various sections', () => {
      const newShipment = shipment();
      newShipment.should.have.property('cargo');
      newShipment.should.have.property('movement');
    });
    it('loads the state', () => {
      const state = { status: 'a' };
      const action = {
        type: ACTION_TYPES.LOAD_SHIPMENT,
        shipment: { status: 'b' },
      };
      shipment(state, action).status.should.equal('b');
    });
    it('sets shipper', () => {
      const state = { shipper: 'a' };
      const action = { type: ACTION_TYPES.SET_SHIPPER, shipper: 'b' };
      shipment(state, action).shipper.should.equal('b');
    });
    it('sets consignee', () => {
      const state = { consignee: 'a' };
      const action = { type: ACTION_TYPES.SET_CONSIGNEE, consignee: 'b' };
      shipment(state, action).consignee.should.equal('b');
    });
    it('sets notify party', () => {
      const state = { notifyParty: 'a' };
      const action = { type: ACTION_TYPES.SET_NOTIFY_PARTY, notifyParty: 'b' };
      shipment(state, action).notifyParty.should.equal('b');
    });
    it('sets shipper address', () => {
      const state = { shipperAddress: 'a' };
      const action = {
        type: ACTION_TYPES.SET_SHIPPER_ADDRESS,
        shipperAddress: 'b',
      };
      shipment(state, action).shipperAddress.should.equal('b');
    });
    it('sets consignee address', () => {
      const state = { consigneeAddress: 'a' };
      const action = {
        type: ACTION_TYPES.SET_CONSIGNEE_ADDRESS,
        consigneeAddress: 'b',
      };
      shipment(state, action).consigneeAddress.should.equal('b');
    });
    it('sets notify party address', () => {
      const state = { notifyPartyAddress: 'a' };
      const action = {
        type: ACTION_TYPES.SET_NOTIFY_PARTY_ADDRESS,
        notifyPartyAddress: 'b',
      };
      shipment(state, action).notifyPartyAddress.should.equal('b');
    });
    it('sets customer reference', () => {
      const state = { customerReference: 'a' };
      const action = {
        type: ACTION_TYPES.SET_CUSTOMER_REFERENCE,
        customerReference: 'b',
      };
      shipment(state, action).customerReference.should.equal('b');
    });
    it('sets b/l type', () => {
      const state = { blType: 'a' };
      const action = {
        type: ACTION_TYPES.SET_BL_TYPE,
        blType: 'b',
      };
      shipment(state, action).blType.should.equal('b');
    });
  });
}
