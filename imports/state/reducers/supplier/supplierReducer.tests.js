/* eslint-env mocha */
/* eslint-disable func-names, prefer-arrow-callback */

import { Meteor } from 'meteor/meteor';
import { chai } from 'meteor/practicalmeteor:chai';
import deepFreeze from 'deep-freeze';

import { supplier, defaultSupplierState } from './supplierReducer';
import * as ACTION_TYPES from '../../actions/actionTypes';

if (Meteor.isClient) {
  describe('Supplier Reducer', () => {
    chai.should();
    it('defaults the state', () => {
      supplier().should.eql(defaultSupplierState);
      defaultSupplierState.name.should.equal('');
      defaultSupplierState.address.should.equal('');
      defaultSupplierState.emailAddress.should.equal('');
      defaultSupplierState.currency.should.equal('');
      defaultSupplierState.branch.should.equal('');
    });
    it('loads the supplier', () => {
      const supplierToLoad = {
        name: 'a',
        address: 'b',
        emailAddress: 'c',
        currency: 'd',
        branch: 'e',
      };
      const action         = {
        type: ACTION_TYPES.LOAD_SUPPLIER,
        supplier: supplierToLoad,
      };
      supplier({}, action).should.eql(supplierToLoad);
    });
    it('loads the default if none is provided', () => {
      const action = { type: ACTION_TYPES.LOAD_SUPPLIER };
      supplier({}, action).should.eql(defaultSupplierState);
    });
    it('sets the name', () => {
      const stateBefore = { name: 'a' };
      const action = { type: ACTION_TYPES.SET_SUPPLIER_NAME, name: 'b' };
      deepFreeze(stateBefore);
      supplier(stateBefore, action).name.should.equal('b');
    });
    it('sets the address', () => {
      const stateBefore = { address: 'a' };
      const action = { type: ACTION_TYPES.SET_SUPPLIER_ADDRESS, address: 'b' };
      deepFreeze(stateBefore);
      supplier(stateBefore, action).address.should.equal('b');
    });
    it('sets the email address', () => {
      const stateBefore = { emailAddress: 'a' };
      const action = { type: ACTION_TYPES.SET_SUPPLIER_EMAIL_ADDRESS, emailAddress: 'b' };
      deepFreeze(stateBefore);
      supplier(stateBefore, action).emailAddress.should.equal('b');
    });
    it('sets the currency', () => {
      const stateBefore = { currency: 'a' };
      const action = { type: ACTION_TYPES.SET_SUPPLIER_CURRENCY, currency: 'b' };
      deepFreeze(stateBefore);
      supplier(stateBefore, action).currency.should.equal('b');
    });
    it('sets the branch', () => {
      const stateBefore = { branch: 'a' };
      const action = { type: ACTION_TYPES.SET_SUPPLIER_BRANCH, branch: 'b' };
      deepFreeze(stateBefore);
      supplier(stateBefore, action).branch.should.equal('b');
    });
  });
}
