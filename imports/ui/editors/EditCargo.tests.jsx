/* eslint-env mocha */
/* eslint-disable func-names, prefer-arrow-callback */

import React from 'react';
import { Meteor } from 'meteor/meteor';
import { shallow } from 'enzyme';
import { chai } from 'meteor/practicalmeteor:chai';

import EditCargo, {
  PackageLines,
  Containers,
  Description,
} from './EditCargo.jsx';
import { cargoDefaultState } from '../../state/reducers/cargo/cargoReducers';

if (Meteor.isClient) {
  chai.should();
  describe('EditCargo Component', () => {
    let wrapper;
    beforeEach(() => {
      wrapper =
        shallow(<EditCargo cargo={cargoDefaultState} dispatchers={{}} />);
    });
    afterEach(() => {
      wrapper.unmount();
    });
    it('renders a component', () => {
      wrapper.exists().should.equal(true);
    });
    it('renders cargo type radio buttons if splitCargoTypes is true', () => {
      wrapper.setProps({ ...wrapper.props, splitCargoTypes: true });
      wrapper.containsMatchingElement((
        <div>
          <button>
            LOOSE
          </button>
          <button>
            CONTAINERIZED
          </button>
        </div>
      )).should.equal(true);
    });
    it('does not render cargo type buttons if splitCargoTypes is false', () => {
      wrapper.setProps({ ...wrapper.props, splitCargoTypes: false });
      wrapper.containsMatchingElement((
        <div>
          <button>
            LOOSE
          </button>
          <button>
            CONTAINERIZED
          </button>
        </div>
      )).should.equal(false);
    });
    it('renders both packages and containers if splitCargoTypes is false and ' +
       'useContainers is true', () => {
      wrapper.setProps({
        ...wrapper.props,
        splitCargoTypes: false,
        useContainers: true,
      });
      wrapper.containsMatchingElement(<PackageLines />).should.equal(true);
      wrapper.containsMatchingElement(<Containers />).should.equal(true);
    });
    it('renders only packages if splitCargoTypes is false and useContainers ' +
       'is false', () => {
      wrapper.setProps({
        ...wrapper.props,
        splitCargoTypes: false,
        useContainers: false,
      });
      wrapper.containsMatchingElement(<PackageLines />).should.equal(true);
      wrapper.containsMatchingElement(<Containers />).should.equal(false);
    });
    it('renders description if useDescription is true', () => {
      wrapper.setProps({
        ...wrapper.props,
        useDescription: true,
      });
      wrapper.containsMatchingElement(<Description />).should.equal(true);
    });
    it('does not render description if useDescription is false', () => {
      wrapper.setProps({
        ...wrapper.props,
        useDescription: false,
      });
      wrapper.containsMatchingElement(<Description />).should.equal(false);
    });
  });
}
