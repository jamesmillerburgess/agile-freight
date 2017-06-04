/* eslint-env mocha */
/* eslint-disable func-names, prefer-arrow-callback */

import React from 'react';
import { Meteor } from 'meteor/meteor';
import { shallow } from 'enzyme';
import { chai } from 'meteor/practicalmeteor:chai';

import EditCustomer from './EditCustomer.jsx';

if (Meteor.isClient) {
  chai.should();
  describe('EditCustomer Component', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = shallow(<EditCustomer />);
    });
    afterEach(() => {
      wrapper.unmount();
    });

    describe('Structure', () => {
      it('renders a component', () => {
        wrapper.exists().should.equal(true);
      });

      it('renders a content', () => {
        wrapper
          .childAt(0)
          .hasClass('content')
          .should
          .equal(true);
      });

      it('renders a content footer accent', () => {
        wrapper
          .childAt(1)
          .contains((
            <div className="content-footer-accent customers-footer-accent" />
          ))
          .should
          .equal(true);
      });
    });
  });
}
