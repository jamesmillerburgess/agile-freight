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
    describe('customerSearch', () => {
      it('returns customers matching part of a word', () => {
        Customers.insert({ name: 'name' });
        customerSearch({ search: 'name' }).length.should.equal(1);
        customerSearch({ search: 'n' }).length.should.equal(1);
        customerSearch({ search: 'a' }).length.should.equal(1);
        customerSearch({ search: 'm' }).length.should.equal(1);
        customerSearch({ search: 'e' }).length.should.equal(1);
        customerSearch({ search: 'f' }).length.should.equal(0);
        customerSearch({ search: 'name1' }).length.should.equal(0);
      });
      it('returns customers matching search words in any order', () => {
        Customers.insert({ name: 'word1 word2 word3' });
        Customers.insert({ name: 'word2 word3 word1' });
        Customers.insert({ name: 'word3 word1 word2' });
        Customers.insert({ name: 'aword3a bword2b bword1b notaword' });
        Customers.insert({ name: 'word4 word2 word3' });
        const res = customerSearch({ search: 'word1 word2 word3' });
        res.length.should.equal(4);
        res[0].name.should.equal('word1 word2 word3');
        res[1].name.should.equal('word2 word3 word1');
        res[2].name.should.equal('word3 word1 word2');
        res[3].name.should.equal('aword3a bword2b bword1b notaword');
      });
    });
  });
}
