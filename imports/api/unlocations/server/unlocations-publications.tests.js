/* eslint-env mocha */
/* eslint-disable func-names, prefer-arrow-callback */

import { chai } from 'meteor/practicalmeteor:chai';
import { Meteor } from 'meteor/meteor';

import './unlocations-publications';

chai.should();

if (Meteor.isServer) {
  describe('UNLocations Publications', () => {
    describe('Publication by List of Locations', () => {
      it('registers as a publication', () => {
        Meteor.server.publish_handlers.should.have.property('unlocations.list');
      });

      it('returns a cursor on the UNLocations collection', () => {
        const cursor = Meteor.server.publish_handlers['unlocations.list']();

        cursor.should.have.property('_cursorDescription');
        cursor._cursorDescription.should.have.property('collectionName');
        cursor._cursorDescription.collectionName.should.equal('UNLocations');
      });

      it('publishes UN Locations in the specified list', () => {
        const cursor = Meteor.server.publish_handlers['unlocations.list'](['a', 'b']);

        cursor._cursorDescription.selector.should.have.property('_id');
        cursor._cursorDescription.selector._id.should.have.property('$in');
        cursor._cursorDescription.selector._id.$in[0].should.equal('a');
        cursor._cursorDescription.selector._id.$in[1].should.equal('b');
      });
    });

    describe('Publication by Country', () => {
      it('registers as a publication', () => {
        Meteor.server.publish_handlers.should.have.property('unlocations.country');
      });

      it('returns a cursor on the UNLocations collection', () => {
        const cursor = Meteor.server.publish_handlers['unlocations.country']();

        cursor.should.have.property('_cursorDescription');
        cursor._cursorDescription.should.have.property('collectionName');
        cursor._cursorDescription.collectionName.should.equal('UNLocations');
      });

      it('publishes UN Locations with the specified country', () => {
        const cursor = Meteor.server.publish_handlers['unlocations.country']('AA');

        cursor._cursorDescription.selector.should.have.property('country');
        cursor._cursorDescription.selector.country.should.equal('AA');
      });
    });
  });
}
