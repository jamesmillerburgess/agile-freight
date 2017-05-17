/* eslint-env mocha */
/* eslint-disable func-names, prefer-arrow-callback */

import { chai } from 'meteor/practicalmeteor:chai';
import { Meteor } from 'meteor/meteor';
import StubCollections from 'meteor/hwillson:stub-collections';

import { Quotes, Schemas } from './quotesCollection';
import { Customers } from '../customers/customers-collection';

import './quoteMethods';

chai.should();

if (Meteor.isServer) {
  describe('Quote Methods', () => {
    beforeEach(() => {
      StubCollections.stub([Quotes, Customers]);
      Quotes.attachSchema(Schemas.Quote);
      Customers.insert({ _id: 'a' });
    });

    afterEach(() => {
      StubCollections.restore();
    });

    describe('quote.new', () => {
      it('inserts a quote into the collection', () => {
        Quotes.find({}).count().should.equal(0);
        Meteor.call('quote.new', 'a');

        Quotes.find({}).count().should.equal(1);
      });

      it('returns the id of the new quote', () => {
        const quoteId = Meteor.call('quote.new', 'a');

        Quotes.findOne()._id.should.equal(quoteId);
      });

      it('inserts a quote with the given customerId', () => {
        const quoteId = Meteor.call('quote.new', 'a');

        Quotes.findOne(quoteId).customerId.should.equal('a');
      });

      it('updates the given customer with the new quote id', () => {
        const quoteId = Meteor.call('quote.new', 'a');

        Customers.findOne('a').quotes[0].should.equal(quoteId);
      });
    });

    describe('quote.newFromRateSearch', () => {
      it('insert a new customer quote into the collection', () => {
        Quotes.find({}).count().should.equal(0);
        Meteor.call('quote.newFromRateSearch', {
          customerId: 'a',
          cargo: {},
          movement: {},
          otherServices: {},
        });
        Quotes.find({}).count().should.equal(1);
      });

      it('only accepts an object as a parameter', () => {
        (() => Meteor.call('quote.newFromRateSearch', 1)).should.throw();
        (() => Meteor.call('quote.newFromRateSearch', 'a')).should.throw();
        (() => Meteor.call('quote.newFromRateSearch', [])).should.throw();
        (() => Meteor.call('quote.newFromRateSearch', true)).should.throw();
      });

      it('requires customerId, cargo, movement, and otherServices options', () => {
        (() => Meteor.call('quote.newFromRateSearch', {})).should.throw();
        (() => Meteor.call('quote.newFromRateSearch', {
          customerId: 'a',
          cargo: {},
          movement: {},
        })).should.throw();
        (() => Meteor.call('quote.newFromRateSearch', {
          customerId: 'a',
          cargo: {},
          otherServices: {},
        })).should.throw();
        (() => Meteor.call('quote.newFromRateSearch', {
          customerId: 'a',
          movement: {},
          otherServices: {},
        })).should.throw();
        (() => Meteor.call('quote.newFromRateSearch', {
          cargo: {},
          movement: {},
          otherServices: {},
        })).should.throw();
      });

      it('returns the new quote id', () => {
        const newQuoteId = Meteor.call('quote.newFromRateSearch', {
          customerId: 'a',
          cargo: {},
          movement: {},
          otherServices: {},
        });

        Quotes.findOne()._id.should.equal(newQuoteId);
      });

      it('inserts a new quote in \'Draft\' status', () => {
        Meteor.call('quote.newFromRateSearch', {
          customerId: 'a',
          cargo: {},
          movement: {},
          otherServices: {},
        });

        Quotes.findOne().status.should.equal('Draft');
      });

      it('inserts a new quote with the given options', () => {
        const customerId = 'a';
        const movement   = {
          pickup: {
            country: 'b',
            location: 'c',
          },
        };
        Meteor.call('quote.newFromRateSearch', {
          customerId,
          cargo: {},
          movement,
          otherServices: {},
        });
        const newQuote = Quotes.findOne();

        newQuote.customerId.should.equal('a');
        newQuote.movement.pickup.country.should.equal('b');
        newQuote.movement.pickup.location.should.equal('c');
      });

      it('throws an error if an invalid customerId is passed', () => {
        const customerId = 'b';
        (() => Meteor.call('quote.newFromRateSearch', {
          customerId,
          cargo: {},
          movement: {},
          otherServices: {},
        })).should.throw();
      });

      it('adds the customer quote ID to the customer', () => {
        const customerId      = 'a';
        const quoteId = Meteor.call('quote.newFromRateSearch', {
          customerId,
          cargo: {},
          movement: {},
          otherServices: {},
        });
        const customer        = Customers.findOne(customerId);

        customer.quotes[0].should.equal(quoteId);
      });
    });

    describe('quote.submit', () => {
      it('changes the quote status to \'Submitted\'', () => {
        const quoteId = Quotes.insert({
          status: 'Draft',
          customerId: 'a',
          cargo: {},
          movement: {},
          otherServices: {},
          charges: {},
        });
        Meteor.call('quote.submit', quoteId);
        const quote = Quotes.findOne(quoteId);

        quote.status.should.equal('Submitted');
      });
    });

    describe('quote.save', () => {
      it('saves changes to the quote', () => {
        const quoteId = Quotes.insert({
          status: 'Draft',
          customerId: 'a',
          cargo: {},
          movement: {},
          otherServices: {},
          charges: {},
        });
        Meteor.call(
          'quote.save',
          {
            _id: quoteId,
            cargo: { a: 'a' },
            movement: { b: 'b' },
            otherServices: { c: 'c' },
            charges: { d: 'd' },
          },
        );
        const quote = Quotes.findOne(quoteId);

        quote.cargo.a.should.equal('a');
        quote.movement.b.should.equal('b');
        quote.otherServices.c.should.equal('c');
        quote.charges.d.should.equal('d');
      });

      it('ignores changes to the status', () => {
        const quoteId = Quotes.insert({
          status: 'Draft',
          customerId: 'a',
          cargo: {},
          movement: {},
          otherServices: {},
          charges: {},
        });
        Meteor.call(
          'quote.save',
          {
            _id: quoteId,
            status: 'Different Status',
            cargo: {},
          },
        );
        const quote = Quotes.findOne(quoteId);

        quote.status.should.equal('Draft');
      });
    });
  });
}
