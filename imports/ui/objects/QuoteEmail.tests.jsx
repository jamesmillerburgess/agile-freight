/* eslint-env mocha */
/* eslint-disable func-names, prefer-arrow-callback */

import React from 'react';
import { Meteor } from 'meteor/meteor';
import { shallow } from 'enzyme';
import { chai } from 'meteor/practicalmeteor:chai';

import QuoteEmail from './QuoteEmail.jsx';

// Stub the method that is used in the component

if (Meteor.isClient) {
  chai.should();
  describe('QuoteEmail Component', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = shallow(<QuoteEmail />);
    });
    afterEach(() => {
      wrapper.unmount();
    });

    describe('Outer Structure', () => {
      it('renders a component', () => {
        wrapper.exists().should.equal(true);
      });

      it('is a table', () => {
        wrapper.name().should.equal('table');
      });

      it('is 600px wide', () => {
        wrapper.prop('style').width.should.equal('600px');
      });

      it('contains a tbody', () => {
        wrapper.childAt(0).name().should.equal('tbody');
      });
    });

    describe('Props', () => {
      it('renders the message at the top in a pre', () => {
        wrapper.setProps({ message: 'Hello' });
        wrapper.contains(<pre>Hello</pre>).should.equal(true);
      });

      it('renders the expiry date', () => {
        wrapper.setProps({
          quote: { expiryDate: new Date('1 January, 2017') },
        });
        wrapper.contains(
          <td
            style={{
              fontSize: '18px',
              textAlign: 'right',
            }}
          >
            EXPIRES 01 JAN 2017
          </td>,
        ).should.equal(true);
      });
    });
  });
}
