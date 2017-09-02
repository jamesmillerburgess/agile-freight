/* eslint-env mocha */
/* eslint-disable func-names, prefer-arrow-callback */

import React from 'react';
import { Meteor } from 'meteor/meteor';
import { shallow } from 'enzyme';
import { chai } from 'meteor/practicalmeteor:chai';

import UNLocationField from './UNLocationField.jsx';

if (Meteor.isClient) {
  describe('UNLocationField Component', () => {
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
      wrapper.setProps({ location: {}, onChange });
      wrapper.props().value.should.eql({});
    });
  });
}
