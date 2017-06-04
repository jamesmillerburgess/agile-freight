/* eslint-env mocha */
/* eslint-disable func-names, prefer-arrow-callback */

import { chai } from 'meteor/practicalmeteor:chai';
import { Meteor } from 'meteor/meteor';
import StubCollections from 'meteor/hwillson:stub-collections';

import { UNLocations } from './unlocationsCollection';
import { Countries } from '../countries/countriesCollection';

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

      it('returns locations for the specified country', () => {
        UNLocations.insert({ country: 'country', name: 'name' });
        UNLocations.insert({ country: 'differentCountry', name: 'name' });
        Countries.insert({ countryCode: 'country' });
        Countries.insert({ countryCode: 'differentCountry' });
        const searchResults = Meteor.call('unlocations.search', { country: 'country', search: '' });

        searchResults.length.should.equal(1);
        searchResults[0].country.should.equal('country');
        searchResults[0].name.should.equal('name');
      });

      it('returns locations matching each of the search words in any order', () => {
        UNLocations.insert({ country: 'country', name: 'word1 word2 word3' });
        UNLocations.insert({ country: 'country', name: 'word2 word3 word1' });
        UNLocations.insert({ country: 'country', name: 'word3 word1 word2' });
        UNLocations.insert({ country: 'country', name: 'aword3a bword2b bword1b notaword' });
        UNLocations.insert({ country: 'country', name: 'word4 word2 word3' });
        Countries.insert({ countryCode: 'country' });
        const searchResults = Meteor.call('unlocations.search', { country: 'country', search: 'word1 word2 word3' });

        searchResults.length.should.equal(4);
        searchResults[0].name.should.equal('word1 word2 word3');
        searchResults[1].name.should.equal('word2 word3 word1');
        searchResults[2].name.should.equal('word3 word1 word2');
        searchResults[3].name.should.equal('aword3a bword2b bword1b notaword');
      });

      it('throws an error if an invalid country is passed', () => {
        Countries.insert({ countryCode: 'country' });

        (() => Meteor.call('unlocations.search', { country: 'notACountry', search: '' })).should.throw();
      });
    });
  });
}
