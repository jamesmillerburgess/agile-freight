/* eslint-env mocha */
/* eslint-disable func-names, prefer-arrow-callback */

import { chai } from 'meteor/practicalmeteor:chai';
import { Meteor } from 'meteor/meteor';
import StubCollections from 'meteor/hwillson:stub-collections';

import { UNLocations } from './unlocations-collection';
import { Countries } from '../countries/countries-collection';

import './unlocationsMethods';

chai.should();

if (Meteor.isServer) {
  describe('UN Location Methods', () => {
    beforeEach(() => {
      StubCollections.stub([UNLocations, Countries]);
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
        UNLocations.insert({ country: 'country', name: 'name' });
        UNLocations.insert({ country: 'differentCountry', name: 'name' });
        UNLocations.insert({ country: 'country', name: 'differentName' });
        UNLocations.insert({ country: 'country', name: 'notAMatch' });
        Countries.insert({ _id: 'country' });
        Countries.insert({ _id: 'differentCountry' });
        const searchResults = Meteor.call('unlocations.search', { country: 'country', search: 'name' });

        searchResults.length.should.equal(2);
        searchResults[0].country.should.equal('country');
        searchResults[0].name.should.equal('name');
        searchResults[1].country.should.equal('country');
        searchResults[1].name.should.equal('differentName');
      });

      it('throws an error if an invalid country is passed', () => {
        Countries.insert({ _id: 'country' });

        (() => Meteor.call('unlocations.search', { country: 'notACountry', search: '' })).should.throw();
      });
    });
  });
}
