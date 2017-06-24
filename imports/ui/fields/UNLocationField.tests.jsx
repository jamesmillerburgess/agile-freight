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

    it('passes the value to Async', () => {
      wrapper.setProps({ location: 'b', onChange });
      wrapper.props().value.should.equal('b');
    });
  });
}
