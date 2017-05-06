/* eslint-env mocha */
/* eslint-disable func-names, prefer-arrow-callback */

import React from 'react';
import { Meteor } from 'meteor/meteor';
import { mount } from 'enzyme';
import StubCollections from 'meteor/hwillson:stub-collections';
import { chai } from 'meteor/practicalmeteor:chai';

import UNLocationField from './UNLocationField.jsx';
import { UNLocations } from '../../api/unlocations/unlocations-collection';

if (Meteor.isClient) {
  describe('UN Location Field', () => {
    chai.should();

    beforeEach(() => {
      StubCollections.stub(UNLocations);
    });

    afterEach(() => {
      StubCollections.restore();
    });

    it('should render a Select element', () => {
      const unLocationField = mount(<UNLocationField unLocations={UNLocations} />);
      unLocationField.exists().should.equal(true);
      unLocationField.hasClass('Select').should.equal(true);
    });

    it('should set options upon change of input', () => {
      UNLocations.insert({ country: 'AA', name: 'Aardvark' });
      const unLocationField = mount(<UNLocationField country="AA" unLocations={UNLocations} />);
      unLocationField.find('input').simulate('change', { target: { value: 'A' } });

      unLocationField.find('.Select-option').text().should.equal('Aardvark');
    });

    it('should include subdivisions in the label following a comma and a space', () => {
      UNLocations.insert({ country: 'AA', name: 'Aardvark', subdivision: 'AL' });
      const unLocationField = mount(<UNLocationField country="AA" unLocations={UNLocations} />);
      unLocationField.find('input').simulate('change', { target: { value: 'A' } });

      unLocationField.find('.Select-option').text().should.equal('Aardvark, AL');
    });

    it('should filter by the country prop', () => {
      UNLocations.insert({ country: 'AA', name: 'Aardvark', subdivision: 'AL' });
      UNLocations.insert({ country: 'BB', name: 'Basilisk', subdivision: 'BS' });
      const unLocationField = mount(<UNLocationField country="BB" unLocations={UNLocations} />);
      unLocationField.find('input').simulate('change', { target: { value: 'A' } });

      unLocationField.find('.Select-option').text().should.equal('Basilisk, BS');
    });
  });
}
