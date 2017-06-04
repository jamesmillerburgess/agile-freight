/* eslint-env mocha */
/* eslint-disable func-names, prefer-arrow-callback */

import { chai } from 'meteor/practicalmeteor:chai';
import { Meteor } from 'meteor/meteor';
import StubCollections from 'meteor/hwillson:stub-collections';

import { Countries } from './countriesCollection';

chai.should();

if (Meteor.isServer) {
  describe('Countries Collection', () => {
    beforeEach(() => {
      StubCollections.stub(Countries);
    });

    afterEach(() => {
      StubCollections.restore();
    });

    it('should have all mandatory and default properties upon insert', () => {
      const newCountry = { countryName: 'A' };
      const newCountryId = Countries.insert(newCountry);
      const newCountryDoc = Countries.findOne(newCountryId);

      newCountryDoc.should.have.property('countryName');
      newCountryDoc.countryName.should.equal('A');
      newCountryDoc.should.not.have.property('countryCode');
      newCountryDoc.should.not.have.property('countryCode3');
      newCountryDoc.should.not.have.property('regionCode');
      newCountryDoc.should.not.have.property('regionName');
      newCountryDoc.should.not.have.property('subregionCode');
      newCountryDoc.should.not.have.property('subregionName');
      newCountryDoc.should.not.have.property('intermediateRegionCode');
      newCountryDoc.should.not.have.property('intermediateRegionName');
    });
  });
}
