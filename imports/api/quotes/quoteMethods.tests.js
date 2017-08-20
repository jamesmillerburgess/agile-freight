/* eslint-env mocha */
/* eslint-disable func-names, prefer-arrow-callback */

import { chai } from 'meteor/practicalmeteor:chai';
import { Meteor } from 'meteor/meteor';

import { Quotes } from './quotesCollection';
import { Customers } from '../customers/customersCollection';
import { Branches } from '../branch/branchCollection';

import { branchNextReference } from '../branch/branchMethods';

import './quoteMethods';

chai.should();

if (Meteor.isServer) {
  describe('Quote Methods', () => {
    beforeEach(() => {
      Quotes.remove({});
      Customers.remove({});
      Branches.remove({});
      Customers.insert({ _id: 'a', currency: 'b', branch: 'c' });
      Branches.insert({ _id: 'c' });
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
      it('sets the currency to that of the customer', () => {
        const quoteId = Meteor.call('quote.new', 'a');
        Quotes.findOne(quoteId).charges.currency.should.equal('b');
      });
      it('sets the created on date', () => {
        const quoteId = Meteor.call('quote.new', 'a');
        Quotes.findOne(quoteId).createdOn.should.be.instanceof(Date);
      });
      it('sets the status to \'Draft\'', () => {
        const quoteId = Meteor.call('quote.new', 'a');
        Quotes.findOne(quoteId).status.should.equal('Draft');
      });
      it('sets the reference to the branches next reference', () => {
        const reference = branchNextReference('c');
        const quoteId = Meteor.call('quote.new', 'a');
        Quotes.findOne(quoteId).reference.should.equal(reference);
      });
      it('adds the quote id to the branch reference array', () => {
        const quoteId = Meteor.call('quote.new', 'a');
        Branches.findOne('c').references[0].type.should.equal('Quote');
        Branches.findOne('c').references[0].reference.should.equal(quoteId);
      });
      it('sets the branch to the same as that of the customer', () => {
        const quoteId = Meteor.call('quote.new', 'a');
        Quotes.findOne(quoteId).branch.should.equal('c');
      });
    });
    describe('quote.copy', () => {
      it('inserts a new quote into the collection', () => {
        Quotes.insert({ _id: 'b', customerId: 'a' });
        Quotes.find({}).count().should.equal(1);
        Meteor.call('quote.copy', 'b');
        Quotes.find({}).count().should.equal(2);
      });
      it('returns the id of the new quote', () => {
        Quotes.insert({ _id: 'b', customerId: 'a' });
        const quoteId = Meteor.call('quote.copy', 'b');
        quoteId.should.be.a('string');
        Quotes.find({ _id: quoteId }).count().should.equal(1);
      });
      it('copies the customer id', () => {
        Quotes.insert({ _id: 'b', customerId: 'a' });
        const quoteId = Meteor.call('quote.copy', 'b');
        Quotes.findOne(quoteId).customerId.should.equal('a');
      });
      it('updates the customer with the new quote id', () => {
        Quotes.insert({
          _id: 'b',
          customerId: 'a',
          cargo: { totalPackages: 1 },
        });
        const quoteId = Meteor.call('quote.copy', 'b');
        Customers.findOne('a').quotes.should.contain(quoteId);
      });
      it('copies the cargo', () => {
        Quotes.insert({
          _id: 'b',
          customerId: 'a',
          cargo: { totalPackages: 1 },
        });
        const quoteId = Meteor.call('quote.copy', 'b');
        Quotes.findOne(quoteId).cargo.should.eql({ totalPackages: 1 });
      });
      it('copies the movement', () => {
        Quotes.insert({
          _id: 'b',
          customerId: 'a',
          movement: { pickup: { location: 'abc' } },
        });
        const quoteId = Meteor.call('quote.copy', 'b');
        Quotes.findOne(quoteId)
              .movement
              .should
              .eql({ pickup: { location: 'abc' } });
      });
      it('copies the other services', () => {
        Quotes.insert({
          _id: 'b',
          customerId: 'a',
          otherServices: { insurance: false },
        });
        const quoteId = Meteor.call('quote.copy', 'b');
        Quotes.findOne(quoteId).otherServices.should.eql({ insurance: false });
      });
      it('copies the charges', () => {
        Quotes.insert({
          _id: 'b',
          customerId: 'a',
          charges: { chargeLines: [] },
        });
        const quoteId = Meteor.call('quote.copy', 'b');
        Quotes
          .findOne(quoteId)
          .charges
          .should
          .eql({ chargeLines: [] });
      });
      it('does not copy the expiry date', () => {
        Quotes.insert({
          _id: 'b',
          customerId: 'a',
          expiryDate: new Date('January 1, 2017'),
        });
        const quoteId = Meteor.call('quote.copy', 'b');
        Quotes.findOne(quoteId).should.not.have.property('expiryDate');
      });
      it('sets the status to \'Draft\'', () => {
        Quotes.insert({ _id: 'b', customerId: 'a' });
        const quoteId = Meteor.call('quote.copy', 'b');
        Quotes.findOne(quoteId).status.should.equal('Draft');
      });
      it('sets the created on date', () => {
        Quotes.insert({ _id: 'b', customerId: 'a' });
        const quoteId = Meteor.call('quote.copy', 'b');
        Quotes.findOne(quoteId).createdOn.should.be.instanceof(Date);
      });
    });
    describe('quote.submit', () => {
      let quoteId;
      let email;
      let expiryDate;
      beforeEach(() => {
        quoteId = Quotes.insert({
          status: 'Draft',
          customerId: 'a',
          cargo: {},
          movement: {},
          otherServices: {},
          charges: {},
        });
        email = {
          to: 'a@a.com',
          cc: 'b@b.com',
          subject: 'Subject',
          message: 'Message',
        };
        expiryDate = new Date('January 1, 2017').toString();
      });
      it('changes the quote status to \'Submitted\'', () => {
        Meteor.call('quote.submit', quoteId, email, expiryDate);
        Quotes.findOne(quoteId).status.should.equal('Submitted');
      });
      it('saves the email against the quote', () => {
        Meteor.call('quote.submit', quoteId, email, expiryDate);
        const quote = Quotes.findOne(quoteId);
        quote.email.to.should.equal('a@a.com');
        quote.email.cc.should.equal('b@b.com');
        quote.email.subject.should.equal('Subject');
        quote.email.message.should.equal('Message');
      });
      it('adds a timestamp to the email for the sent date', () => {
        Meteor.call('quote.submit', quoteId, email, expiryDate);
        Quotes.findOne(quoteId).email.sentDate.should.be.instanceOf(Date);
      });
      it('saves the expiry date against the quote', () => {
        Meteor.call('quote.submit', quoteId, email, expiryDate);
        Quotes.findOne(quoteId)
              .expiryDate
              .toString()
              .should
              .equal(expiryDate.toString());
      });
      // TODO: Fix timeout issue
      // it('requires a quote id, an email object, and an expiry date', () => {
      //   (() => Meteor.call('quote.submit', null, email,
      // expiryDate)).should.throw(Error); (() => Meteor.call('quote.submit',
      // quoteId, null, expiryDate)).should.throw(Error); (() =>
      // Meteor.call('quote.submit', quoteId, email,
      // null)).should.throw(Error); });

      // it('throws an error if the quote does not exist', () => {
      //   (() => Meteor.call('quote.submit', 'abc',
      // email)).should.throw(Error); });

      // it('throws an error if the status is \'Submitted\'', () => {
      //   Quotes.update({ _id: quoteId }, { $set: { status: 'Submitted' } });
      //   (() => Meteor.call('quote.submit', quoteId,
      // email)).should.throw(Error); });

      // it('throws an error if the status is \'Expired\'', () => {
      //   Quotes.update({ _id: quoteId }, { $set: { status: 'Expired' } });
      //   (() => Meteor.call('quote.submit', quoteId)).should.throw(Error);
      // });
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
          email: {},
        });
        Meteor.call(
          'quote.save',
          {
            _id: quoteId,
            cargo: { a: 'a' },
            movement: { b: 'b' },
            otherServices: { c: 'c' },
            charges: { d: 'd' },
            email: { e: 'e' },
          },
        );
        const quote = Quotes.findOne(quoteId);

        quote.cargo.a.should.equal('a');
        quote.movement.b.should.equal('b');
        quote.otherServices.c.should.equal('c');
        quote.charges.d.should.equal('d');
        quote.email.e.should.equal('e');
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

    describe('quote.archive', () => {
      it('changes the status to Archived', () => {
        const quoteId = Quotes.insert({
          status: 'Draft',
          customerId: 'a',
          cargo: {},
          movement: {},
          otherServices: {},
          charges: {},
        });
        Meteor.call('quote.archive', quoteId);
        const quote = Quotes.findOne(quoteId);

        quote.status.should.equal('Archived');
      });

      // it('throws an error if the quote does not exist', () => {
      //   (() => Meteor.call('quote.archive', 'x')).should.throw(Error);
      // });

      // it('throws an error if the status is Submitted', () => {
      //   const quoteId = Quotes.insert({
      //     status: 'Submitted',
      //     customerId: 'a',
      //     cargo: {},
      //     movement: {},
      //     otherServices: {},
      //     charges: {},
      //   });
      //
      //   (() => Meteor.call('quote.archive', quoteId)).should.throw(Error);
      // });

      // it('throws an error if the status is Expired', () => {
      //   const quoteId = Quotes.insert({
      //     status: 'Expired',
      //     customerId: 'a',
      //     cargo: {},
      //     movement: {},
      //     otherServices: {},
      //     charges: {},
      //   });
      //
      //   (() => Meteor.call('quote.archive', quoteId)).should.throw(Error);
      // });

      // it('throws an error if the status is not Draft', () => {
      //   const quoteId = Quotes.insert({
      //     status: 'Not Draft',
      //     customerId: 'a',
      //     cargo: {},
      //     movement: {},
      //     otherServices: {},
      //     charges: {},
      //   });
      //
      //   (() => Meteor.call('quote.archive', quoteId)).should.throw(Error);
      // });
    });
  });
}
