/* eslint-env mocha */
/* eslint-disable func-names, prefer-arrow-callback */

import { chai } from 'meteor/practicalmeteor:chai';
import { Meteor } from 'meteor/meteor';
import { PublicationCollector } from 'meteor/johanbrook:publication-collector';
import { Random } from 'meteor/random';

import './branchPublications';
import { Branches } from '../branchCollection';

chai.should();

if (Meteor.isServer) {
  describe('Branch Publications', () => {
    describe('branch.all', () => {
      const collector = new PublicationCollector({ userId: Random.id() });
      beforeEach(() => {
        Branches.remove({});
        Branches.insert({ _id: 'a', name: 'a' });
        Branches.insert({ _id: 'b', name: 'b' });
      });

      it('registers as a publication', () => {
        Meteor.server.publish_handlers.should.have.property('branch.all');
      });

      it('publishes all branches', (done) => {
        collector.collect('branch.all', (collections) => {
          collections.should.have.property('Branches');
          collections.Branches.length.should.equal(2);
          collections.Branches[0]._id.should.equal('a');
          collections.Branches[1]._id.should.equal('b');
          done();
        });
      });
    });
  });
}
