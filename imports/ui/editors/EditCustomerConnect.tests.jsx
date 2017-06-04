/* eslint-env mocha */
/* eslint-disable func-names, prefer-arrow-callback */

import React from 'react';
import { Meteor } from 'meteor/meteor';
import { shallow } from 'enzyme';
import { chai } from 'meteor/practicalmeteor:chai';

import EditCustomerConnect from './EditCustomerConnect.js';

if (Meteor.isClient) {
  chai.should();
  describe('EditCustomerConnect Component', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = shallow(<EditCustomerConnect />);
    });
    afterEach(() => {
      wrapper.unmount();
    });
  });
}
