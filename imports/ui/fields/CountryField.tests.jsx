/* eslint-env mocha */
/* eslint-disable func-names, prefer-arrow-callback */

import React from 'react';
import { Meteor } from 'meteor/meteor';
import { mount } from 'enzyme';
import StubCollections from 'meteor/hwillson:stub-collections';
import { chai } from 'meteor/practicalmeteor:chai';

import CountryField from './CountryField.jsx';
import { Countries } from '../../api/countries/countries-collection';

if (Meteor.isClient) {
  describe('Country Field', () => {
    chai.should();

    beforeEach(() => {
      StubCollections.stub(Countries);
    });

    afterEach(() => {
      StubCollections.restore();
    });

    it('should render a Select element', () => {
      const countryField = mount(<CountryField countries={Countries} />);
      countryField.exists().should.equal(true);
      countryField.hasClass('Select').should.equal(true);
    });

    it('should filter options upon change of input', () => {
      Countries.insert({ countryCode: 'AA', countryName: 'Aardvark' });
      const countryField = mount(<CountryField countries={Countries} />);
      countryField.find('input').simulate('change', { target: { value: 'A' } });

      countryField.find('.Select-option').text().should.equal('Aardvark');

      countryField.find('input').simulate('change', { target: { value: 'B' } });
      countryField.find('.Select-noresults').text().should.equal('No results found');
    });
  });
}
