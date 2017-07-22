/* eslint-env mocha */
/* eslint-disable func-names, prefer-arrow-callback */

import React from 'react';
import { Meteor } from 'meteor/meteor';
import { shallow } from 'enzyme';
import { chai } from 'meteor/practicalmeteor:chai';

import EditCargo from './EditCargo.jsx';
import { cargoDefaultState } from '../../state/reducers/cargo/cargoReducers';

if (Meteor.isClient) {
  chai.should();
  describe('EditCargo Component', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = shallow(<EditCargo cargo={cargoDefaultState} dispatchers={[]} />);
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
