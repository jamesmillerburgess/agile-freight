/* eslint-env mocha */
/* eslint-disable func-names, prefer-arrow-callback */

import { chai } from 'meteor/practicalmeteor:chai';
import { Meteor } from 'meteor/meteor';

import { UNLocations } from './unlocationsCollection';
import { Countries } from '../countries/countriesCollection';

import './unlocationsMethods';

chai.should();

if (Meteor.isServer) {
  describe('UN Location Methods', () => {
    beforeEach(() => {
      UNLocations.remove({});
      Countries.remove({});
    });

    describe('unlocations.search', () => {
      // it('only accepts an object as a parameter', () => {
      //   (() => Meteor.call('unlocations.search', 1)).should.throw();
      //   (() => Meteor.call('unlocations.search', 'a')).should.throw();
      //   (() => Meteor.call('unlocations.search', [])).should.throw();
      //   (() => Meteor.call('unlocations.search', true)).should.throw();
      // });
      //
      // it('requires country and search options', () => {
      //   (() => Meteor.call('unlocations.search', {})).should.throw();
      //   (() => Meteor.call('unlocations.search', { country: 'a'
      // })).should.throw(); (() => Meteor.call('unlocations.search', { search:
      // 'a' })).should.throw(); });

      it('returns locations for the specified country', () => {
        UNLocations.insert({
          countryCode: 'country',
          search: 'name',
          isSeaport: false,
          isAirport: false,
        });
        UNLocations.insert({
          countryCode: 'differentCountry',
          search: 'name',
          isSeaport: false,
          isAirport: false,
        });
        Countries.insert({ countryCode: 'country' });
        Countries.insert({ countryCode: 'differentCountry' });
        const searchResults = Meteor.call('unlocations.search', {
          country: 'country',
          search: '',
          locations: true,
          airports: false,
          seaports: false,
        });

        searchResults.length.should.equal(1);
        searchResults[0].countryCode.should.equal('country');
        searchResults[0].search.should.equal('name');
      });

      it('returns locations matching each of the search words in any order',
        () => {
          UNLocations.insert({
            countryCode: 'country',
            search: 'word1 word2 word3',
            isSeaport: false,
            isAirport: false,
          });
          UNLocations.insert({
            countryCode: 'country',
            search: 'word2 word3 word1',
            isSeaport: false,
            isAirport: false,
          });
          UNLocations.insert({
            countryCode: 'country',
            search: 'word3 word1 word2',
            isSeaport: false,
            isAirport: false,
          });
          UNLocations.insert({
            countryCode: 'country',
            search: 'aword3a bword2b bword1b notaword',
            isSeaport: false,
            isAirport: false,
          });
          UNLocations.insert({
            countryCode: 'country',
            search: 'word4 word2 word3',
            isSeaport: false,
            isAirport: false,
          });
          Countries.insert({ countryCode: 'country' });
          const searchResults = Meteor.call('unlocations.search', {
            country: 'country',
            search: 'word1 word2 word3',
            locations: true,
            airports: false,
            seaports: false,
          });

          searchResults.length.should.equal(4);
          searchResults[0].search.should.equal('word1 word2 word3');
          searchResults[1].search.should.equal('word2 word3 word1');
          searchResults[2].search.should.equal('word3 word1 word2');
          searchResults[3].search.should.equal(
            'aword3a bword2b bword1b notaword');
        });

      // it('throws an error if an invalid country is passed', () => {
      //   Countries.insert({ countryCode: 'country' });
      //
      //   (() => Meteor.call('unlocations.search', {
      //     country: 'notACountry',
      //     search: '',
      //   })).should.throw();
      // });

      it('prioritizes a search for an id over text', () => {
        const id = 'a';
        UNLocations.insert({
          _id: id,
          countryCode: 'b',
          search: 'c',
          isSeaport: false,
          isAirport: false,
        });
        UNLocations.insert({
          _id: 'd',
          countryCode: 'b',
          search: 'e',
          isSeaport: false,
          isAirport: false,
        });
        Countries.insert({ countryCode: 'b' });
        const searchResults = Meteor.call('unlocations.search', {
          country: 'b',
          search: '',
          id,
          locations: true,
          airports: false,
          seaports: false,
        });
        searchResults.length.should.equal(1);
        searchResults[0].search.should.equal('c');
      });
    });
  });
}
