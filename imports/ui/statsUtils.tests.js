/* eslint-env mocha */
/* eslint-disable func-names, prefer-arrow-callback */

import { Meteor } from 'meteor/meteor';
import { chai } from 'meteor/practicalmeteor:chai';
import deepFreeze from 'deep-freeze';

import { uniqueValues, countByValue } from './statsUtils';

if (Meteor.isClient) {
  describe('Stats Utilities', () => {
    chai.should();

    describe('uniqueValues', () => {
      it('gets unique values correctly', () => {
        const data = [
          { key: 'a' },
          { key: 'a' },
          { key: 'b' },
        ];
        const path = 'key';
        deepFreeze(data);
        const values = uniqueValues(data, path);

        values[0].should.equal('a');
        values[1].should.equal('b');
      });

      it('handles nested paths correctly', () => {
        const data = [
          { key1: { key2: 'a' } },
          { key1: { key2: 'a' } },
          { key1: { key2: 'b' } },
        ];
        const path = 'key1.key2';
        deepFreeze(data);
        const values = uniqueValues(data, path);

        values[0].should.equal('a');
        values[1].should.equal('b');
      });

      it('handles empty values', () => {
        const data = [
          { key: 'a' },
          { key: '' },
          { key: 'b' },
        ];
        const path = 'key';
        deepFreeze(data);
        const values = uniqueValues(data, path);

        values[0].should.equal('a');
        values[1].should.equal('');
        values[2].should.equal('b');
      });

      it('handles an empty array', () => {
        const data = [];
        const path = 'key';
        deepFreeze(data);
        const values = uniqueValues(data, path);

        values.should.be.empty;
      });

      it('handles an undefined path', () => {
        const data = [
          { key: 'a' },
          { key: 'a' },
          { key: 'b' },
        ];
        deepFreeze(data);
        const values = uniqueValues(data);

        values.should.be.empty;
      });
    });

    describe('countByValue', () => {
      it('counts correctly', () => {
        const data = [
          { key: 'a' },
          { key: 'a' },
          { key: 'b' },
        ];
        const path = 'key';
        deepFreeze(data);
        const counts = countByValue(data, path);

        counts.a.should.equal(2);
        counts.b.should.equal(1);
      });

      it('handles nested paths correctly', () => {
        const data = [
          { key1: { key2: 'a' } },
          { key1: { key2: 'a' } },
          { key1: { key2: 'b' } },
        ];
        const path = 'key1.key2';
        deepFreeze(data);
        const counts = countByValue(data, path);

        counts.a.should.equal(2);
        counts.b.should.equal(1);
      });

      it('handles empty values', () => {
        const data = [
          { key: 'a' },
          { key: '' },
          { key: 'b' },
        ];
        const path = 'key';
        deepFreeze(data);
        const counts = countByValue(data, path);

        counts.a.should.equal(1);
        counts.b.should.equal(1);
        counts[''].should.equal(1);
      });

      it('handles an empty array', () => {
        const data = [];
        const path = 'key';
        deepFreeze(data);
        const counts = countByValue(data, path);

        counts.should.be.empty;
      });

      it('handles an undefined path', () => {
        const data = [
          { key: 'a' },
          { key: 'a' },
          { key: 'b' },
        ];
        deepFreeze(data);
        const counts = countByValue(data);

        counts.should.be.empty;
      });
    });
  });
}
