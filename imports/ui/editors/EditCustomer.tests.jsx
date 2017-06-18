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

      it('renders a process header', () => {
        wrapper
          .find('.content')
          .childAt(0)
          .hasClass('process-header')
          .should
          .equal(true);
      });

      it('renders a title in the process header', () => {
        wrapper
          .find('.process-header')
          .childAt(0)
          .contains(<div className="title">NEW CUSTOMER</div>)
          .should
          .equal(true);
      });

      it('renders a link back to the customer list', () => {
        wrapper
          .find('.process-header')
          .childAt(1)
          .name()
          .should
          .equal('Link');
        wrapper
          .find('Link')
          .props()
          .to
          .should
          .equal('/customers');
      });

      it('renders a customer list button in the link', () => {
        wrapper
          .find('Link')
          .contains((
            <button className="button-primary">BACK TO CUSTOMER LIST</button>
          ))
          .should
          .equal(true);
      });

      it('renders a panel', () => {
        wrapper
          .find('.content')
          .childAt(1)
          .hasClass('panel')
          .should
          .equal(true);
      });

      it('renders a name input field', () => {
        wrapper
          .find('.panel .vertical-input-group')
          .at(1)
          .childAt(0)
          .contains(<span className="label">NAME</span>)
          .should
          .equal(true);
        wrapper
          .find('.panel .vertical-input-group')
          .at(1)
          .childAt(1)
          .name()
          .should
          .equal('input');
      });

      it('renders an address textarea field', () => {
        wrapper
          .find('.panel .vertical-input-group')
          .at(2)
          .childAt(0)
          .contains(<span className="label">ADDRESS</span>)
          .should
          .equal(true);
        wrapper
          .find('.panel .vertical-input-group')
          .at(2)
          .childAt(1)
          .name()
          .should
          .equal('textarea');
      });

      it('renders a currency input field', () => {
        wrapper
          .find('.panel .vertical-input-group')
          .at(4)
          .childAt(0)
          .contains(<span className="label">CURRENCY</span>)
          .should
          .equal(true);
        wrapper
          .find('.panel .vertical-input-group')
          .at(4)
          .childAt(1)
          .name()
          .should
          .equal('input');
      });

      it('renders an email address input field', () => {
        wrapper
          .find('.panel .vertical-input-group')
          .at(3)
          .childAt(0)
          .contains(<span className="label">EMAIL ADDRESS</span>)
          .should
          .equal(true);
        wrapper
          .find('.panel .vertical-input-group')
          .at(3)
          .childAt(1)
          .name()
          .should
          .equal('input');
      });

      it('renders a branch input field', () => {
        wrapper
          .find('.panel .vertical-input-group')
          .at(0)
          .childAt(0)
          .contains(<span className="label">BRANCH</span>)
          .should
          .equal(true);
        wrapper
          .find('.panel .vertical-input-group')
          .at(0)
          .childAt(1)
          .name()
          .should
          .equal('BranchField');
      });
    });
  });
}
