/* eslint-env mocha */
/* eslint-disable func-names, prefer-arrow-callback */

import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { shallow } from 'enzyme';
import StubCollections from 'meteor/hwillson:stub-collections';
import { chai } from 'meteor/practicalmeteor:chai';

import UNLocationField from './UNLocationField.jsx';
import { UNLocations } from '../../api/unlocations/unlocationsCollection';
import { Countries } from '../../api/countries/countriesCollection';

if (Meteor.isClient) {
  describe('UN Location Field', () => {
    chai.should();
    let wrapper;
    const onChange = () => null;

    beforeEach(() => {
      wrapper = shallow(<UNLocationField onChange={onChange} />);
    });

    afterEach(() => {
      wrapper.unmount();
    });

    it('renders a disabled Select component if no country is provided', () => {
      wrapper.exists().should.equal(true);
      wrapper.name().should.equal('Select');
      wrapper.props().disabled.should.equal(true);
    });

    it('renders an Async component if a country is provided', () => {
      wrapper.setProps({ country: 'a', onChange });
      wrapper.name().should.equal('Async');
    });

    it('passes the value to Async', () => {
      wrapper.setProps({ country: 'a', value: 'b', onChange });
      wrapper.props().value.should.equal('b');
    });

    it('sets cache to false', () => {
      wrapper.setProps({ country: 'a', value: 'b', onChange });
      wrapper.props().cache.should.equal(false);
    });
  });
}
