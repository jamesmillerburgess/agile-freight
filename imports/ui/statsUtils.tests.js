/* eslint-env mocha */
/* eslint-disable func-names, prefer-arrow-callback */

import { Meteor } from 'meteor/meteor';
import { chai } from 'meteor/practicalmeteor:chai';
import deepFreeze from 'deep-freeze';

import { getDeepVal, countByTimePeriod, sumByTimePeriod, uniqueValues, countByValue } from './statsUtils';

if (Meteor.isClient) {
  describe('Stats Utilities', () => {
    chai.should();

    describe('getDeepVal', () => {
      it('gets a value an object using a nested path', () => {
        const obj = { key1: { key2: 'value' } };
        const path = 'key1.key2';
        deepFreeze([obj, path]);

        getDeepVal(obj, path).should.equal('value');
      });

      it('handles a nested path expressed as an array', () => {
        const obj = { key1: { key2: 'value' } };
        const path = ['key1', 'key2'];
        deepFreeze([obj, path]);

        getDeepVal(obj, path).should.equal('value');
      });
    });

    describe('countByTimePeriod', () => {
      it('counts by date', () => {
        const data = [
          { date: new Date('01-Apr-2017') },
          { date: new Date('01-Apr-2017') },
          { date: new Date('01-May-2017') },
          { date: new Date('01-May-2018') },
        ];
        deepFreeze(data);
        const counts = countByTimePeriod(data);

        counts['01-Apr-2017'].should.equal(2);
        counts['01-May-2017'].should.equal(1);
        counts['01-May-2018'].should.equal(1);
      });

      it('counts by month', () => {
        const data = [
          { date: new Date('01-Apr-2017') },
          { date: new Date('02-Apr-2017') },
          { date: new Date('03-May-2017') },
          { date: new Date('04-May-2018') },
        ];
        const datePath = 'date';
        const dateFormat = 'MMM-YYYY';
        deepFreeze([data, datePath, dateFormat]);
        const counts = countByTimePeriod(data, datePath, dateFormat);

        counts['Apr-2017'].should.equal(2);
        counts['May-2017'].should.equal(1);
        counts['May-2018'].should.equal(1);
      });

      it('counts by quarter', () => {
        const data = [
          { date: new Date('01-Apr-2017') },
          { date: new Date('02-Apr-2017') },
          { date: new Date('03-May-2017') },
          { date: new Date('04-May-2018') },
        ];
        const datePath = 'date';
        const dateFormat = '[Q]Q-YYYY';
        deepFreeze([data, datePath, dateFormat]);
        const counts = countByTimePeriod(data, datePath, dateFormat);

        counts['Q2-2017'].should.equal(3);
        counts['Q2-2018'].should.equal(1);
      });

      it('counts by year', () => {
        const data = [
          { date: new Date('01-Apr-2017') },
          { date: new Date('02-Apr-2017') },
          { date: new Date('03-May-2017') },
          { date: new Date('04-May-2018') },
        ];
        const datePath = 'date';
        const dateFormat = 'YYYY';
        deepFreeze([data, datePath, dateFormat]);
        const counts = countByTimePeriod(data, datePath, dateFormat);

        counts['2017'].should.equal(3);
        counts['2018'].should.equal(1);
      });

      it('handles nested paths correctly', () => {
        const data = [
          { key1: { date: new Date('01-Apr-2017') } },
          { key1: { date: new Date('01-Apr-2017') } },
          { key1: { date: new Date('01-May-2017') } },
          { key1: { date: new Date('01-May-2018') } },
        ];
        const datePath = 'key1.date';
        deepFreeze([data, datePath]);
        const counts = countByTimePeriod(data, datePath);

        counts['01-Apr-2017'].should.equal(2);
        counts['01-May-2017'].should.equal(1);
        counts['01-May-2018'].should.equal(1);
      });

      it('handles empty dates', () => {
        const data = [
          { date: new Date('01-Apr-2017') },
          { date: new Date('01-Apr-2017') },
          {},
          { date: new Date('01-May-2018') },
        ];
        deepFreeze(data);
        const counts = countByTimePeriod(data);

        Object.keys(counts).length.should.equal(2);
        counts['01-Apr-2017'].should.equal(2);
        counts['01-May-2018'].should.equal(1);
      });

      it('handles an empty array', () => {
        const data = [];
        deepFreeze(data);
        const counts = countByTimePeriod(data);

        Object.keys(counts).length.should.equal(0);
      });
    });

    describe('sumByTimePeriod', () => {
      it('sums by date', () => {
        const data = [
          { value: 1, date: new Date('01-Apr-2017') },
          { value: 2, date: new Date('01-Apr-2017') },
          { value: 3, date: new Date('01-May-2017') },
          { value: 4, date: new Date('01-May-2018') },
        ];
        deepFreeze(data);
        const sums = sumByTimePeriod(data);

        sums['01-Apr-2017'].should.equal(3);
        sums['01-May-2017'].should.equal(3);
        sums['01-May-2018'].should.equal(4);
      });

      it('sum by month', () => {
        const data = [
          { value: 1, date: new Date('01-Apr-2017') },
          { value: 2, date: new Date('02-Apr-2017') },
          { value: 3, date: new Date('03-May-2017') },
          { value: 4, date: new Date('04-May-2018') },
        ];
        const valuePath = 'value';
        const datePath = 'date';
        const dateFormat = 'MMM-YYYY';
        deepFreeze([data, valuePath, datePath, dateFormat]);
        const sums = sumByTimePeriod(data, valuePath, datePath, dateFormat);

        sums['Apr-2017'].should.equal(3);
        sums['May-2017'].should.equal(3);
        sums['May-2018'].should.equal(4);
      });

      it('sums by quarter', () => {
        const data = [
          { value: 1, date: new Date('01-Apr-2017') },
          { value: 2, date: new Date('02-Apr-2017') },
          { value: 3, date: new Date('03-May-2017') },
          { value: 4, date: new Date('04-May-2018') },
        ];
        const valuePath = 'value';
        const datePath = 'date';
        const dateFormat = '[Q]Q-YYYY';
        deepFreeze([data, valuePath, datePath, dateFormat]);
        const sums = sumByTimePeriod(data, valuePath, datePath, dateFormat);

        sums['Q2-2017'].should.equal(6);
        sums['Q2-2018'].should.equal(4);
      });

      it('sums by year', () => {
        const data = [
          { value: 1, date: new Date('01-Apr-2017') },
          { value: 2, date: new Date('02-Apr-2017') },
          { value: 3, date: new Date('03-May-2017') },
          { value: 4, date: new Date('04-May-2018') },
        ];
        const valuePath = 'value';
        const datePath = 'date';
        const dateFormat = 'YYYY';
        deepFreeze([data, valuePath, datePath, dateFormat]);
        const sums = sumByTimePeriod(data, valuePath, datePath, dateFormat);

        sums['2017'].should.equal(6);
        sums['2018'].should.equal(4);
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
        deepFreeze([data, valuePath, datePath]);
        const sums = sumByTimePeriod(data, valuePath, datePath);

        sums['01-Apr-2017'].should.equal(3);
        sums['01-May-2017'].should.equal(3);
        sums['01-May-2018'].should.equal(4);
      });

      it('handles empty values', () => {
        const data = [
          { value: 1, date: new Date('01-Apr-2017') },
          { value: 2, date: new Date('01-Apr-2017') },
          { date: new Date('01-May-2017') },
          { value: 4, date: new Date('01-May-2018') },
        ];
        deepFreeze(data);
        const sums = sumByTimePeriod(data);

        sums['01-Apr-2017'].should.equal(3);
        sums['01-May-2017'].should.equal(0);
        sums['01-May-2018'].should.equal(4);
      });

      it('handles empty dates', () => {
        const data = [
          { value: 1, date: new Date('01-Apr-2017') },
          { value: 2, date: new Date('01-Apr-2017') },
          { value: 3 },
          { value: 4, date: new Date('01-May-2018') },
        ];
        deepFreeze(data);
        const sums = sumByTimePeriod(data);

        Object.keys(sums).length.should.equal(2);
        sums['01-Apr-2017'].should.equal(3);
        sums['01-May-2018'].should.equal(4);
      });

      it('handles an empty array', () => {
        const data = [];
        deepFreeze(data);
        const sums = sumByTimePeriod(data);

        Object.keys(sums).length.should.equal(0);
      });
    });

    describe('uniqueValues', () => {
      it('gets unique values correctly', () => {
        const data = [
          { key: 'a' },
          { key: 'a' },
          { key: 'b' },
        ];
        const path = 'key';
        deepFreeze([data, path]);
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
        deepFreeze([data, path]);
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
        deepFreeze([data, path]);
        const values = uniqueValues(data, path);

        values[0].should.equal('a');
        values[1].should.equal('');
        values[2].should.equal('b');
      });

      it('handles an empty array', () => {
        const data = [];
        const path = 'key';
        deepFreeze([data, path]);
        const values = uniqueValues(data, path);

        Object.keys(values).length.should.equal(0);
      });

      it('handles an undefined path', () => {
        const data = [
          { key: 'a' },
          { key: 'a' },
          { key: 'b' },
        ];
        deepFreeze(data);
        const values = uniqueValues(data);

        Object.keys(values).length.should.equal(0);
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
        deepFreeze([data, path]);
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
        deepFreeze([data, path]);
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
        deepFreeze([data, path]);
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

        Object.keys(counts).length.should.equal(0);
      });

      it('handles an undefined path', () => {
        const data = [
          { key: 'a' },
          { key: 'a' },
          { key: 'b' },
        ];
        deepFreeze(data);
        const counts = countByValue(data);

        Object.keys(counts).length.should.equal(0);
      });
    });
  });
}
