/* eslint-env mocha */
/* eslint-disable func-names, prefer-arrow-callback */

import { chai } from 'meteor/practicalmeteor:chai';
import { Meteor } from 'meteor/meteor';
import StubCollections from 'meteor/hwillson:stub-collections';

import { UNLocations } from './unlocations-collection';

import './unlocationsMethods';

chai.should();

if (Meteor.isServer) {
  describe('UN Location Methods', () => {
    beforeEach(() => {
      StubCollections.stub([UNLocations]);
    });

    afterEach(() => {
      StubCollections.restore();
    });

    describe('unlocations.search', () => {
      it('only accepts an object as a parameter', () => {
        (() => Meteor.call('unlocations.search', 1)).should.throw();
        (() => Meteor.call('unlocations.search', 'a')).should.throw();
        (() => Meteor.call('unlocations.search', [])).should.throw();
        (() => Meteor.call('unlocations.search', true)).should.throw();
      });

      it('requires country and search options', () => {
        (() => Meteor.call('unlocations.search', {})).should.throw();
        (() => Meteor.call('unlocations.search', { country: 'a' })).should.throw();
        (() => Meteor.call('unlocations.search', { search: 'a' })).should.throw();
      });

      it('returns locations meeting the criteria', () => {
        // const newQuoteId = Meteor.call('customerQuote.newFromRateSearch', { customerId: 'a', rateParameters: {} });
        //
        // CustomerQuotes.findOne()._id.should.equal(newQuoteId);
      });

      it('throws an error if an invalid country is passed', () => {
        // const customerId = 'b';
        // const rateParameters = {};
        // (() => Meteor.call('customerQuote.newFromRateSearch', { customerId, rateParameters })).should.throw();
      });
    });
  });
}
