/* eslint-env mocha */
/* eslint-disable func-names, prefer-arrow-callback */

import { chai } from 'meteor/practicalmeteor:chai';
import { Meteor } from 'meteor/meteor';

import { Customers } from '../customers/customersCollection';
import { stakeholderSearch } from './stakeholderMethods';

chai.should();

if (Meteor.isServer) {
  describe('Stakeholder Methods', () => {
    beforeEach(() => {
      Customers.remove({});
    });
    describe('stakeholderSearch', () => {
      it('returns customers matching part of a word', () => {
        Customers.insert({ name: 'name' });
        stakeholderSearch({
          search: 'name',
          fetchCustomers: true,
        }).length.should.equal(1);
        stakeholderSearch({
          search: 'n',
          fetchCustomers: true,
        }).length.should.equal(1);
        stakeholderSearch({
          search: 'a',
          fetchCustomers: true,
        }).length.should.equal(1);
        stakeholderSearch({
          search: 'm',
          fetchCustomers: true,
        }).length.should.equal(1);
        stakeholderSearch({
          search: 'e',
          fetchCustomers: true,
        }).length.should.equal(1);
        stakeholderSearch({
          search: 'f',
          fetchCustomers: true,
        }).length.should.equal(0);
        stakeholderSearch({ search: 'name1' }).length.should.equal(0);
      });
      it('returns customers matching search words in any order', () => {
        Customers.insert({ name: 'word1 word2 word3' });
        Customers.insert({ name: 'word2 word3 word1' });
        Customers.insert({ name: 'word3 word1 word2' });
        Customers.insert({ name: 'aword3a bword2b bword1b notaword' });
        Customers.insert({ name: 'word4 word2 word3' });
        const res = stakeholderSearch({
          search: 'word1 word2 word3',
          fetchCustomers: true,
        });
        res.length.should.equal(4);
        res[0].name.should.equal('word1 word2 word3');
        res[1].name.should.equal('word2 word3 word1');
        res[2].name.should.equal('word3 word1 word2');
        res[3].name.should.equal('aword3a bword2b bword1b notaword');
      });
    });
  });
}
