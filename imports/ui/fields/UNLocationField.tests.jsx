/* eslint-env mocha */
/* eslint-disable func-names, prefer-arrow-callback */

import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { mount } from 'enzyme';
import StubCollections from 'meteor/hwillson:stub-collections';
import { chai } from 'meteor/practicalmeteor:chai';

import UNLocationField from './UNLocationField.jsx';
import { UNLocations } from '../../api/unlocations/unlocationsCollection';
import { Countries } from '../../api/countries/countriesCollection';

if (Meteor.isClient) {
  describe('UN Location Field', () => {
    chai.should();

    beforeEach(() => {
      StubCollections.stub([UNLocations, Countries]);
      Countries.insert({ _id: new Mongo.ObjectID('aaaaaaaaaaaaaaaaaaaaaaaa'), countryCode: 'aaaaaaaaaaaaaaaaaaaaaaaa' });
      Countries.insert({ _id: new Mongo.ObjectID('bbbbbbbbbbbbbbbbbbbbbbbb'), countryCode: 'bbbbbbbbbbbbbbbbbbbbbbbb' });
    });

    afterEach(() => {
      StubCollections.restore();
    });

    it('should render a Select element', () => {
      const unLocationField = mount(<UNLocationField unLocations={UNLocations} />);
      unLocationField.exists().should.equal(true);
      unLocationField.hasClass('Select').should.equal(true);

      unLocationField.unmount();
    });

    it('should filter options upon change of input', () => {
      UNLocations.insert({ country: 'aaaaaaaaaaaaaaaaaaaaaaaa', name: 'Aardvark' });
      const unLocationField = mount(<UNLocationField country="aaaaaaaaaaaaaaaaaaaaaaaa" unLocations={UNLocations} />);
      unLocationField.find('input').simulate('change', { target: { value: 'A' } });

      unLocationField.find('.option-label').text().should.equal('Aardvark');

      unLocationField.find('input').simulate('change', { target: { value: 'B' } });
      unLocationField.find('.Select-noresults').text().should.equal('No results found');
      unLocationField.unmount();
    });

    it('should include subdivisions in the label following a comma and a space', () => {
      UNLocations.insert({ country: 'aaaaaaaaaaaaaaaaaaaaaaaa', name: 'Aardvark', subdivision: 'AL' });
      const unLocationField = mount(<UNLocationField country="aaaaaaaaaaaaaaaaaaaaaaaa" unLocations={UNLocations} />);
      unLocationField.find('input').simulate('change', { target: { value: 'A' } });

      unLocationField.find('.Select-option').text().should.equal('Aardvark, AL');
      unLocationField.unmount();
    });

    it('should filter by the country prop', () => {
      UNLocations.insert({ country: 'aaaaaaaaaaaaaaaaaaaaaaaa', name: 'Aardvark', subdivision: 'AL' });
      UNLocations.insert({ country: 'bbbbbbbbbbbbbbbbbbbbbbbb', name: 'Basilisk', subdivision: 'BS' });
      const unLocationField = mount(<UNLocationField country="bbbbbbbbbbbbbbbbbbbbbbbb" unLocations={UNLocations} />);
      unLocationField.find('input').simulate('change', { target: { value: 'A' } });

      unLocationField.find('.Select-option').text().should.equal('Basilisk, BS');
      unLocationField.unmount();
    });
  });
}
