/* eslint-env mocha */
/* eslint-disable func-names, prefer-arrow-callback */

import React from 'react';
import { Meteor } from 'meteor/meteor';
import { shallow } from 'enzyme';
import { chai } from 'meteor/practicalmeteor:chai';

import CustomerList, { CustomerListInner } from './CustomerList.jsx';

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

      it('renders a process header', () => {
        wrapper
          .find('.content')
          .childAt(0)
          .hasClass('process-header')
          .should
          .equal(true);
      });

      it('renders a title', () => {
        wrapper
          .find('.process-header')
          .childAt(0)
          .contains(<div className="title">CUSTOMER LIST</div>)
          .should
          .equal(true);
      });

      it('renders a horizontal input group', () => {
        wrapper
          .find('.process-header')
          .childAt(1)
          .hasClass('horizontal-input-group')
          .should
          .equal(true);
      });

      it('renders a branch label', () => {
        wrapper
          .find('.horizontal-input-group')
          .childAt(0)
          .contains(<div className="label">BRANCH</div>)
          .should
          .equal(true);
      });

      it('renders a BranchField', () => {
        wrapper
          .find('.horizontal-input-group')
          .childAt(1)
          .childAt(0)
          .name()
          .should
          .equal('BranchField');
      });

      it('renders a button to a new customer button', () => {
        wrapper
          .find('.process-header')
          .childAt(2)
          .name()
          .should
          .equal('button');
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

    describe('Structure', () => {
      it('renders a component', () => {
        wrapper.exists().should.equal(true);
      });
    });
  });
}