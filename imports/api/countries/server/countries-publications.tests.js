/* eslint-env mocha */
/* eslint-disable func-names, prefer-arrow-callback */

import { chai } from 'meteor/practicalmeteor:chai';
import { Meteor } from 'meteor/meteor';

import './countries-publications';

chai.should();

if (Meteor.isServer) {
  describe('Countries Publications', () => {
    describe('Country Publication', () => {
      it('registers as a publication', () => {
        Meteor.server.publish_handlers.should.have.property('countries');
      });

      it('returns a cursor on the Countries collection', () => {
        const cursor = Meteor.server.publish_handlers.countries();

        cursor.should.have.property('_cursorDescription');
        cursor._cursorDescription.should.have.property('collectionName');
        cursor._cursorDescription.collectionName.should.equal('Countries');
      });

      it('publishes all countries in the collection', () => {
        const cursor = Meteor.server.publish_handlers.countries();

        cursor._cursorDescription.selector.should.be.empty;
      });
    });
  });
}
