/* eslint-env mocha */
/* eslint-disable func-names, prefer-arrow-callback */

import { chai } from 'meteor/practicalmeteor:chai';
import { Meteor } from 'meteor/meteor';
import StubCollections from 'meteor/hwillson:stub-collections';

import { Customers } from './customers-collection';
import './customer-methods';

chai.should();

if (Meteor.isServer) {
  describe('Customer Methods', () => {
    beforeEach(() => {
      StubCollections.stub(Customers);
    });

    afterEach(() => {
      StubCollections.restore();
    });
    
    describe('customer.new', () => {
      it('insert a new customer into the collection', () => {
        Customers.find({}).count().should.equal(0);
        Meteor.call('customer.new', {});
        Customers.find({}).count().should.equal(1);
      });

      it('only accepts an object as a parameter', () => {
        (function () { Meteor.call('customer.new', 1); }).should.throw();
        (function () { Meteor.call('customer.new', 'a'); }).should.throw();
        (function () { Meteor.call('customer.new', []); }).should.throw();
        (function () { Meteor.call('customer.new', true); }).should.throw();
      });
    });
  });
}
