/* eslint-env mocha */
/* eslint-disable func-names, prefer-arrow-callback */

import React from 'react';
import { Meteor } from 'meteor/meteor';
import { shallow } from 'enzyme';
import { chai } from 'meteor/practicalmeteor:chai';

import ToggleButton from './ToggleButton.jsx';

if (Meteor.isClient) {
  chai.should();
  describe('ToggleButton Component', () => {
    let wrapper;
    let clicked;
    const click = () => {
      clicked += 1;
    };
    beforeEach(() => {
      clicked = 0;
      wrapper = shallow(
        <ToggleButton
          active
          onClick={click}
        />,
      );
    });
    afterEach(() => {
      wrapper.unmount();
    });
    it('renders a component', () => {
      wrapper.exists().should.equal(true);
    });
    it('runs the onClick function when clicked', () => {
      wrapper.simulate('click');
      clicked.should.equal(1);
    });
    it('has the active class if active is true', () => {
      wrapper.hasClass('active').should.equal(true);
    });
    it('does not have the active class if active is false', () => {
      wrapper.setProps({ active: false, onClick: click });
      wrapper.hasClass('active').should.equal(false);
    });
  });
}
