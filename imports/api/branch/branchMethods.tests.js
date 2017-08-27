/* eslint-env mocha */
/* eslint-disable func-names, prefer-arrow-callback */

import { chai } from 'meteor/practicalmeteor:chai';
import { Meteor } from 'meteor/meteor';

import { Branches } from './branchCollection';
import { branchNextReference } from './branchMethods';

chai.should();

if (Meteor.isServer) {
  describe('Branch Methods', () => {
    beforeEach(() => {
      Branches.remove({});
    });
    describe('branch.new', () => {
      it('insert a new branch into the collection', () => {
        Branches.find({}).count().should.equal(0);
        Meteor.call('branch.new', { name: 'newBranch' });
        Branches.find({}).count().should.equal(1);
        Branches.findOne().name.should.equal('newBranch');
      });
      it('returns the id of the new branch', () => {
        const id = Meteor.call('branch.new', { name: 'newBranch' });
        Branches.findOne()._id.should.equal(id);
      });
      it('accepts a name property', () => {
        (() => Meteor.call('branch.new', { name: 'newBranch' }))
          .should
          .not
          .throw();
      });
      it('strips out extraneous properties', function () {
        this.timeout(10000);
        (() => Meteor.call('branch.new', { name: 'newBranch', prop: 'prop' }))
          .should
          .throw();
      });
    });
    describe('branch.save', () => {
      let branchId;
      beforeEach(() => {
        branchId = Branches.insert({ name: 'a' });
      });
      it('updates the branch name', () => {
        Meteor.call('branch.save', branchId, { name: 'b' });
        Branches.findOne(branchId).name.should.equal('b');
      });
    });
    describe('Next Reference', () => {
      it('throws if the branch id is invalid', () => {
        (() => branchNextReference('a')).should.throw();
      });
      it('starts with 1', () => {
        Branches.insert({ _id: 'a', code: 'AAA' });
        branchNextReference('a').should.equal('AAA000001');
      });
      it('increments as references are used', () => {
        Branches.insert({ _id: 'a', code: 'AAA', references: ['b'] });
        branchNextReference('a').should.equal('AAA000002');
        Branches.update('a', { $push: { references: 'c' } });
        branchNextReference('a').should.equal('AAA000003');
      });
    });
  });
}
