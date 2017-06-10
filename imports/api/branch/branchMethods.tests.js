/* eslint-env mocha */
/* eslint-disable func-names, prefer-arrow-callback */

import { chai } from 'meteor/practicalmeteor:chai';
import { Meteor } from 'meteor/meteor';
import StubCollections from 'meteor/hwillson:stub-collections';

import { Branches } from './branchCollection';
import './branchMethods';

chai.should();

if (Meteor.isServer) {
  describe('Branch Methods', () => {
    beforeEach(() => {
      StubCollections.stub(Branches);
    });

    afterEach(() => {
      StubCollections.restore();
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

      it('strips out extraneous properties', () => {
        (() => Meteor.call('branch.new', { name: 'newBranch', prop: 'prop' }))
          .should
          .throw();
      });
    });

    describe('branch.update', () => {
      let branchId;
      beforeEach(() => {
        branchId = Branches.insert({ name: 'a' });
      });

      afterEach(() => {
        StubCollections.restore();
      });
      it('updates the branch name', () => {
        Meteor.call('branch.edit', branchId, { name: 'b' });
        Branches.findOne(branchId).name.should.equal('b');
      });
    });
  });
}
