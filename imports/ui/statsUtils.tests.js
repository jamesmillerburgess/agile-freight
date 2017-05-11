/* eslint-env mocha */
/* eslint-disable func-names, prefer-arrow-callback */

import { Meteor } from 'meteor/meteor';
import { chai } from 'meteor/practicalmeteor:chai';
import deepFreeze from 'deep-freeze';

import { getDeepVal, groupByDate, uniqueValues, countByValue } from './statsUtils';

if (Meteor.isClient) {
  describe('Stats Utilities', () => {
    chai.should();

    describe('getDeepVal', () => {
      it('gets a value an object using a nested path', () => {
        const obj = { key1: { key2: 'value' } };
        const path = 'key1.key2';
        getDeepVal(obj, path).should.equal('value');
      });

      it('handles a nested path expressed as an array', () => {
        const obj = { key1: { key2: 'value' } };
        const path = ['key1', 'key2'];
        getDeepVal(obj, path).should.equal('value');
      });
    });

    describe('groupByDate', () => {
      it('groups by date', () => {
        const data = [
          { value: 1, date: new Date('01-Apr-2017') },
          { value: 2, date: new Date('01-Apr-2017') },
          { value: 3, date: new Date('01-May-2017') },
          { value: 4, date: new Date('01-May-2018') },
        ];
        const group = groupByDate(data);

        group['01-Apr-2017'].should.equal(3);
        group['01-May-2017'].should.equal(3);
        group['01-May-2018'].should.equal(4);
      });

      it('handles nested paths correctly', () => {
        const data = [
          { key1: { value: 1 }, key2: { date: new Date('01-Apr-2017') } },
          { key1: { value: 2 }, key2: { date: new Date('01-Apr-2017') } },
          { key1: { value: 3 }, key2: { date: new Date('01-May-2017') } },
          { key1: { value: 4 }, key2: { date: new Date('01-May-2018') } },
        ];
        const valuePath = 'key1.value';
        const datePath = 'key2.date';
        const group = groupByDate(data, valuePath, datePath);

        group['01-Apr-2017'].should.equal(3);
        group['01-May-2017'].should.equal(3);
        group['01-May-2018'].should.equal(4);
      });

      it('handles empty values', () => {});

      it('handles an empty array', () => {});

      it('handles an undefined path', () => {});
    });

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
