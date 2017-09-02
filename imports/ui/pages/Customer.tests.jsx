/* eslint-env mocha */
/* eslint-disable func-names, prefer-arrow-callback */

import React from 'react';
import { Meteor } from 'meteor/meteor';
import { shallow } from 'enzyme';
import { chai } from 'meteor/practicalmeteor:chai';

import { CustomerInner } from './Customer.jsx';

if (Meteor.isClient) {
  chai.should();
  describe('CustomerInner Component', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = shallow(
        <CustomerInner
          customer={{ movement: {} }}
          loading={false}
          history={{}}
        />,
      );
    });
    afterEach(() => {
      wrapper.unmount();
    });
    it('renders a component', () => {
      wrapper.exists().should.equal(true);
    });
    it('shows active by default', () => {
      wrapper.instance().props.filters.showActive.should.equal(true);
    });
    it('does not show inactive by default', () => {
      wrapper.instance().props.filters.showInactive.should.equal(false);
    });
    it('shows air by default', () => {
      wrapper.instance().props.filters.showAir.should.equal(true);
    });
    it('shows sea by default', () => {
      wrapper.instance().props.filters.showSea.should.equal(true);
    });
    it('shows road by default', () => {
      wrapper.instance().props.filters.showRoad.should.equal(true);
    });
    it('shows brokerage by default', () => {
      wrapper.instance().props.filters.showBrokerage.should.equal(true);
    });
  });
}
