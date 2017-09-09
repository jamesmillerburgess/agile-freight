/* eslint-env mocha */
/* eslint-disable func-names, prefer-arrow-callback */

import { Meteor } from 'meteor/meteor';
import { chai } from 'meteor/practicalmeteor:chai';
import deepFreeze from 'deep-freeze';

import { shipment, charges } from './shipmentReducer';
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
    it('sets charges to empty if it is not an array when loading', () => {
      const action = { type: ACTION_TYPES.LOAD_SHIPMENT, shipment: { charges: {} }};
      shipment(null, action).charges.length.should.equal(0);
    });
  });
  describe('Charges Reducer', () => {
    it('adds a charge', () => {
      const stateBefore = [];
      const action = {
        type: ACTION_TYPES.ADD_CHARGE,
        charge: { type: 'External' },
      };
      deepFreeze(stateBefore, action);
      charges(stateBefore, action)[0].type.should.equal('External');
    });
    it('removes a charge', () => {
      const stateBefore = [{ id: 'a' }, { id: 'b' }];
      const action = {
        type: ACTION_TYPES.REMOVE_CHARGE,
        id: 'a',
      };
      deepFreeze(stateBefore, action);
      charges(stateBefore, action)[0].id.should.equal('b');
    });
    it('sets charge name', () => {
      const stateBefore = [{ id: 'a', name: 'b' }];
      const action = {
        type: ACTION_TYPES.SET_CHARGE_NAME,
        id: 'a',
        name: 'c',
      };
      deepFreeze(stateBefore, action);
      charges(stateBefore, action)[0].name.should.equal('c');
    });
    it('sets charge customer', () => {
      const stateBefore = [{ id: 'a', customer: 'b' }];
      const action = {
        type: ACTION_TYPES.SET_CHARGE_CUSTOMER,
        id: 'a',
        customer: 'c',
      };
      deepFreeze(stateBefore, action);
      charges(stateBefore, action)[0].customer.should.equal('c');
    });
    it('sets charge revenue', () => {
      const stateBefore = [{ id: 'a', revenue: 1 }];
      const action = {
        type: ACTION_TYPES.SET_CHARGE_REVENUE,
        id: 'a',
        revenue: 2,
      };
      deepFreeze(stateBefore, action);
      charges(stateBefore, action)[0].revenue.should.equal(2);
    });
    it('sets charge revenue currency', () => {
      const stateBefore = [{ id: 'a', revenueCurrency: 'b' }];
      const action = {
        type: ACTION_TYPES.SET_CHARGE_REVENUE_CURRENCY,
        id: 'a',
        revenueCurrency: 'c',
      };
      deepFreeze(stateBefore, action);
      charges(stateBefore, action)[0].revenueCurrency.should.equal('c');
    });
    it('sets charge supplier', () => {
      const stateBefore = [{ id: 'a', supplier: 'b' }];
      const action = {
        type: ACTION_TYPES.SET_CHARGE_SUPPLIER,
        id: 'a',
        supplier: 'c',
      };
      deepFreeze(stateBefore, action);
      charges(stateBefore, action)[0].supplier.should.equal('c');
    });
    it('sets charge cost', () => {
      const stateBefore = [{ id: 'a', cost: 1 }];
      const action = {
        type: ACTION_TYPES.SET_CHARGE_COST,
        id: 'a',
        cost: 2,
      };
      deepFreeze(stateBefore, action);
      charges(stateBefore, action)[0].cost.should.equal(2);
    });
    it('sets charge cost currency', () => {
      const stateBefore = [{ id: 'a', costCurrency: 'b' }];
      const action = {
        type: ACTION_TYPES.SET_CHARGE_COST_CURRENCY,
        id: 'a',
        costCurrency: 'c',
      };
      deepFreeze(stateBefore, action);
      charges(stateBefore, action)[0].costCurrency.should.equal('c');
    });
  });
}
