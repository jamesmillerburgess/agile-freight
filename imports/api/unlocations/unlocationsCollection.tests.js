/* eslint-env mocha */
/* eslint-disable func-names, prefer-arrow-callback */

import { chai } from 'meteor/practicalmeteor:chai';
import { Meteor } from 'meteor/meteor';
import StubCollections from 'meteor/hwillson:stub-collections';

import { UNLocations, Schemas } from './unlocationsCollection';

chai.should();

if (Meteor.isServer) {
  describe('UNLocations Collection', () => {
    beforeEach(() => {
      StubCollections.stub(UNLocations);
    });

    afterEach(() => {
      StubCollections.restore();
    });

    it('should have all mandatory and default properties upon insert', () => {
      const newUNLoc = {
        country: 'AA',
        locationCode: 'AAA',
        name: 'Aaa',
        nameWoDiacritics: 'Aaaaa',
      };
      const newUNLocId = UNLocations.insert(newUNLoc);
      const newUNLocDoc = UNLocations.findOne(newUNLocId);

      newUNLocDoc.should.have.property('country');
      newUNLocDoc.country.should.equal('AA');
      newUNLocDoc.should.have.property('locationCode');
      newUNLocDoc.locationCode.should.equal('AAA');
      newUNLocDoc.should.have.property('name');
      newUNLocDoc.name.should.equal('Aaa');
      newUNLocDoc.should.have.property('nameWoDiacritics');
      newUNLocDoc.nameWoDiacritics.should.equal('Aaaaa');
    });
  });
}
