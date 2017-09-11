/* eslint-env mocha */
/* eslint-disable func-names, prefer-arrow-callback */

import React from 'react';
import { Meteor } from 'meteor/meteor';
import { shallow } from 'enzyme';
import { chai } from 'meteor/practicalmeteor:chai';

import StakeholderField, { loadStakeholders } from './StakeholderField.jsx';

if (Meteor.isClient) {
  chai.should();
  describe('StakeholderField Component', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = shallow(<StakeholderField />);
    });
    afterEach(() => {
      wrapper.unmount();
    });
    it('renders a component', () => {
      wrapper.exists().should.equal(true);
    });
    it('renders a Select.Async component', () => {
      wrapper.is('Async').should.equal(true);
    });
  });
}
