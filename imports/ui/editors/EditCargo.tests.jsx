/* eslint-env mocha */
/* eslint-disable func-names, prefer-arrow-callback */

import React from 'react';
import { Meteor } from 'meteor/meteor';
import { shallow } from 'enzyme';
import { chai } from 'meteor/practicalmeteor:chai';

import EditCargo from './EditCargo.jsx';

if (Meteor.isClient) {
  chai.should();
  describe('EditCustomer Component', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = shallow(<EditCargo cargo={{}} dispatchers={[]} />);
    });
    afterEach(() => {
      wrapper.unmount();
    });

    describe('Structure', () => {
      it('renders a component', () => {
        wrapper.exists().should.equal(true);
      });
    });
  });
}
