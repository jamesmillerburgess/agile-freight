/* eslint-env mocha */
/* eslint-disable func-names, prefer-arrow-callback */

import { chai } from 'meteor/practicalmeteor:chai';
import { Meteor } from 'meteor/meteor';
import StubCollections from 'meteor/hwillson:stub-collections';

import { CustomerQuotes, Schemas } from './customerQuotesCollection';
import { Customers } from '../customers/customers-collection';

import './customerQuoteMethods';

chai.should();

if (Meteor.isServer) {
  describe('Customer Quote Methods', () => {
    beforeEach(() => {
      StubCollections.stub([CustomerQuotes, Customers]);
      CustomerQuotes.attachSchema(Schemas.CustomerQuote);
      Customers.insert({ _id: 'a' });
    });

    afterEach(() => {
      StubCollections.restore();
    });

    describe('quote.newFromRateSearch', () => {
      it('insert a new customer quote into the collection', () => {
        CustomerQuotes.find({}).count().should.equal(0);
        Meteor.call('customerQuote.newFromRateSearch', { customerId: 'a', cargo: {}, movement: {}, otherServices: {} });
        CustomerQuotes.find({}).count().should.equal(1);
      });

      it('only accepts an object as a parameter', () => {
        (() => Meteor.call('customerQuote.newFromRateSearch', 1)).should.throw();
        (() => Meteor.call('customerQuote.newFromRateSearch', 'a')).should.throw();
        (() => Meteor.call('customerQuote.newFromRateSearch', [])).should.throw();
        (() => Meteor.call('customerQuote.newFromRateSearch', true)).should.throw();
      });

      it('requires customerId, cargo, movement, and otherServices options', () => {
        (() => Meteor.call('customerQuote.newFromRateSearch', {})).should.throw();
        (() => Meteor.call('customerQuote.newFromRateSearch', { customerId: 'a', cargo: {}, movement: {} })).should.throw();
        (() => Meteor.call('customerQuote.newFromRateSearch', { customerId: 'a', cargo: {}, otherServices: {} })).should.throw();
        (() => Meteor.call('customerQuote.newFromRateSearch', { customerId: 'a', movement: {}, otherServices: {} })).should.throw();
        (() => Meteor.call('customerQuote.newFromRateSearch', { cargo: {}, movement: {}, otherServices: {} })).should.throw();
      });

      it('returns the new quote id', () => {
        const newQuoteId = Meteor.call('customerQuote.newFromRateSearch', { customerId: 'a', cargo: {}, movement: {}, otherServices: {} });

        CustomerQuotes.findOne()._id.should.equal(newQuoteId);
      });

      it('inserts a new quote in \'Draft\' status', () => {
        Meteor.call('customerQuote.newFromRateSearch', { customerId: 'a', cargo: {}, movement: {}, otherServices: {} });

        CustomerQuotes.findOne().status.should.equal('Draft');
      });

      it('inserts a new quote with the given options', () => {
        const customerId = 'a';
        const movement = {
          pickup: {
            country: 'b',
            location: 'c',
          },
        };
        Meteor.call('customerQuote.newFromRateSearch', { customerId, cargo: {}, movement, otherServices: {} });
        const newQuote = CustomerQuotes.findOne();

        newQuote.customerId.should.equal('a');
        newQuote.movement.pickup.country.should.equal('b');
        newQuote.movement.pickup.location.should.equal('c');
      });

      it('throws an error if an invalid customerId is passed', () => {
        const customerId = 'b';
        (() => Meteor.call('customerQuote.newFromRateSearch', { customerId, cargo: {}, movement: {}, otherServices: {} })).should.throw();
      });

      it('adds the customer quote ID to the customer', () => {
        const customerId = 'a';
        const customerQuoteId = Meteor.call('customerQuote.newFromRateSearch', { customerId, cargo: {}, movement: {}, otherServices: {} });
        const customer = Customers.findOne(customerId);

        customer.customerQuotes[0].should.equal(customerQuoteId);
      });
    });
  });
}
