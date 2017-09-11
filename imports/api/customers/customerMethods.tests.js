/* eslint-env mocha */
/* eslint-disable func-names, prefer-arrow-callback */

import { chai } from 'meteor/practicalmeteor:chai';
import { Meteor } from 'meteor/meteor';

import { Customers } from './customersCollection';
import { customerSearch } from './customerMethods';

chai.should();

if (Meteor.isServer) {
  describe('Customer Methods', () => {
    beforeEach(() => {
      Customers.remove({});
    });
    describe('customer.new', () => {
      it('insert a new customer into the collection', () => {
        Customers.find({}).count().should.equal(0);
        Meteor.call('customer.new', {});
        Customers.find({}).count().should.equal(1);
      });
      it('returns the id of the new customer', () => {
        const id = Meteor.call('customer.new', {});
        Customers.findOne(id)._id.should.equal(id);
      });
      it('adds an empty array of quotes if none are provided', () => {
        const id = Meteor.call('customer.new', {});
        Customers.findOne(id).quotes.should.be.instanceOf(Array);
        Customers.findOne(id).quotes.length.should.equal(0);
      });
      it('adds an empty array of shipments if none are provided', () => {
        const id = Meteor.call('customer.new', {});
        Customers.findOne(id).shipments.should.be.instanceOf(Array);
        Customers.findOne(id).shipments.length.should.equal(0);
      });
    });
    describe('customer.save', () => {
      let customerId;
      beforeEach(() => {
        customerId = Customers.insert({
          name: 'b',
          address: 'c',
          emailAddress: 'd',
          currency: 'e',
        });
      });
      it('saves changes to the customer', () => {
        Meteor.call('customer.save', customerId, { name: '1' });
        Customers.findOne(customerId).name.should.equal('1');
        Meteor.call('customer.save', customerId, { address: '1' });
        Customers.findOne(customerId).address.should.equal('1');
        Meteor.call('customer.save', customerId, { emailAddress: '1' });
        Customers.findOne(customerId).emailAddress.should.equal('1');
        Meteor.call('customer.save', customerId, { currency: '1' });
        Customers.findOne(customerId).currency.should.equal('1');
      });
      it('throws an error if other properties are passed', () => {
        (() =>
          Meteor.call('customer.save', customerId, {
            _id: 'x',
          })).should.throw();
      });
    });
  });
}
