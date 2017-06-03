/* eslint-env mocha */
/* eslint-disable func-names, prefer-arrow-callback */

import { chai } from 'meteor/practicalmeteor:chai';
import { Meteor } from 'meteor/meteor';

import { buildSearchRegExp } from './searchUtils';

chai.should();

if (Meteor.isClient) {
  describe('Search Utilities', () => {
    describe('buildSearchRegExp', () => {
      it('returns a regular expression', () => {
        const regexp = buildSearchRegExp();

        (regexp instanceof RegExp).should.equal(true);
      });

      it('only accepts a string as a parameter', () => {
        (() => buildSearchRegExp(true)).should.throw();
        (() => buildSearchRegExp(1)).should.throw();
        (() => buildSearchRegExp({})).should.throw();
        (() => buildSearchRegExp([])).should.throw();
        (() => buildSearchRegExp(null)).should.throw();
      });

      it('returns a regular expression that looks for all words in a string in any order', () => {
        const regexp = buildSearchRegExp('word1 word2 word3');

        regexp.test('word1 word2 word3').should.equal(true);
        regexp.test('word2 word3 word1').should.equal(true);
        regexp.test('word3 word2 word1').should.equal(true);
        regexp.test('aword3a bword2b bword1b notaword').should.equal(true);
        regexp.test('word4 word2 word3').should.equal(false);
      });
    });
  });
}
