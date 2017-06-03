/* eslint-env mocha */
/* eslint-disable func-names, prefer-arrow-callback */

import { chai } from 'meteor/practicalmeteor:chai';
import { Meteor } from 'meteor/meteor';
import StubCollections from 'meteor/hwillson:stub-collections';

import { UNLocations, Schemas } from './unlocations-collection';

chai.should();

if (Meteor.isServer) {
  describe('UNLocations Collection', () => {
    beforeEach(() => {
      StubCollections.stub(UNLocations);
      UNLocations.attachSchema(Schemas.UNLocation);
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
      newUNLocDoc.should.not.have.property('subdivision');
      newUNLocDoc.should.not.have.property('IATA');
      newUNLocDoc.should.have.property('isUnknown');
      newUNLocDoc.isUnknown.should.equal(false);
      newUNLocDoc.should.have.property('isPort');
      newUNLocDoc.isPort.should.equal(false);
      newUNLocDoc.should.have.property('isRailTerminal');
      newUNLocDoc.isRailTerminal.should.equal(false);
      newUNLocDoc.should.have.property('isRoadTerminal');
      newUNLocDoc.isRoadTerminal.should.equal(false);
      newUNLocDoc.should.have.property('isAirport');
      newUNLocDoc.isAirport.should.equal(false);
      newUNLocDoc.should.have.property('isPostalExchange');
      newUNLocDoc.isPostalExchange.should.equal(false);
      newUNLocDoc.should.have.property('isMultimodal');
      newUNLocDoc.isMultimodal.should.equal(false);
      newUNLocDoc.should.have.property('isFixedTransport');
      newUNLocDoc.isFixedTransport.should.equal(false);
      newUNLocDoc.should.have.property('isBorderCrossing');
      newUNLocDoc.isBorderCrossing.should.equal(false);
      newUNLocDoc.should.not.have.property('latitude');
      newUNLocDoc.should.not.have.property('longitude');
    });
  });
}
