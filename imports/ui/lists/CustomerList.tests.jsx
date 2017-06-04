/* eslint-env mocha */
/* eslint-disable func-names, prefer-arrow-callback */

import React from 'react';
import { Meteor } from 'meteor/meteor';
import { shallow } from 'enzyme';
import { chai } from 'meteor/practicalmeteor:chai';

import CustomerList, { CustomerListInner } from './CustomerList.jsx';
import { Customers } from '../../api/customers/customers-collection';

if (Meteor.isClient) {
  chai.should();
  describe('CustomerListInner Component', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = shallow(<CustomerListInner />);
    });
    afterEach(() => {
      wrapper.unmount();
    });

    describe('Outer Structure', () => {
      it('renders a component', () => {
        console.log(wrapper.debug());
        wrapper.exists().should.equal(true);
      });
    });
  });

  describe('CustomerList Component', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = shallow(<CustomerList />);
    });
    afterEach(() => {
      wrapper.unmount();
    });

    describe('Outer Structure', () => {
      it('renders a component', () => {
        console.log(wrapper.debug());
        wrapper.exists().should.equal(true);
      });
    });
  });
}