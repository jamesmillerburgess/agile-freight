/* eslint-env mocha */
/* eslint-disable func-names, prefer-arrow-callback */

import { Meteor } from 'meteor/meteor';
import { chai } from 'meteor/practicalmeteor:chai';
import deepFreeze from 'deep-freeze';

import { customer, defaultCustomerState } from './customerReducers';
import * as ACTION_TYPES from '../../actions/actionTypes';

if (Meteor.isClient) {
  describe('Customer Reducer', () => {
    chai.should();

    it('defaults each field to blank', () => {
      customer().should.eql(defaultCustomerState);
      defaultCustomerState.name.should.equal('');
      defaultCustomerState.address.should.equal('');
      defaultCustomerState.emailAddress.should.equal('');
      defaultCustomerState.currency.should.equal('');
      defaultCustomerState.branch.should.equal('');
    });

    it('loads the customer', () => {
      const customerToLoad = {
        name: 'a',
        address: 'b',
        emailAddress: 'c',
        currency: 'd',
        branch: 'e',
      };
      const action         = {
        type: ACTION_TYPES.LOAD_CUSTOMER,
        customer: customerToLoad,
      };

      customer({}, action).should.eql(customerToLoad);
    });

    it('loads the default customer if none is provided', () => {
      const action = { type: ACTION_TYPES.LOAD_CUSTOMER };
      customer({}, action).should.eql(defaultCustomerState);
    });

    it('sets the name', () => {
      const stateBefore = { name: 'a' };
      const action = { type: ACTION_TYPES.SET_CUSTOMER_NAME, name: 'b' };
      deepFreeze(stateBefore);
      customer(stateBefore, action).name.should.equal('b');
    });

    it('sets the address', () => {
      const stateBefore = { address: 'a' };
      const action = { type: ACTION_TYPES.SET_CUSTOMER_ADDRESS, address: 'b' };
      deepFreeze(stateBefore);
      customer(stateBefore, action).address.should.equal('b');
    });

    it('sets the email address', () => {
      const stateBefore = { emailAddress: 'a' };
      const action = { type: ACTION_TYPES.SET_CUSTOMER_EMAIL_ADDRESS, emailAddress: 'b' };
      deepFreeze(stateBefore);
      customer(stateBefore, action).emailAddress.should.equal('b');
    });

    it('sets the currency', () => {
      const stateBefore = { currency: 'a' };
      const action = { type: ACTION_TYPES.SET_CUSTOMER_CURRENCY, currency: 'b' };
      deepFreeze(stateBefore);
      customer(stateBefore, action).currency.should.equal('b');
    });

    it('sets the branch', () => {
      const stateBefore = { branch: 'a' };
      const action = { type: ACTION_TYPES.SET_CUSTOMER_BRANCH, branch: 'b' };
      deepFreeze(stateBefore);
      customer(stateBefore, action).branch.should.equal('b');
    });
  });
}
