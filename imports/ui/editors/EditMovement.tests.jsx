/* eslint-env mocha */
/* eslint-disable func-names, prefer-arrow-callback */

import React from 'react';
import { Meteor } from 'meteor/meteor';
import { shallow } from 'enzyme';
import { chai } from 'meteor/practicalmeteor:chai';

import EditMovement, { Dates } from './EditMovement.jsx';
import { movementDefaultState } from '../../state/reducers/movement/movementReducers';

if (Meteor.isClient) {
  chai.should();
  describe('EditMovement Component', () => {
    let wrapper;
    beforeEach(() => {
      wrapper =
        shallow((
          <EditMovement movement={movementDefaultState} dispatchers={{}} />
        ));
    });
    afterEach(() => {
      wrapper.unmount();
    });
    it('renders a component', () => {
      wrapper.exists().should.equal(true);
    });
    it('renders dates when useDates is true', () => {
      wrapper.setProps({ ...wrapper.props, useDates: true });
      wrapper.containsMatchingElement(<Dates />).should.equal(true);
    });
    it('does not render dates when useDates is false', () => {
      wrapper.setProps({ ...wrapper.props, useDates: false });
      wrapper.containsMatchingElement(<Dates />).should.equal(false);
    });
  });
}
