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

      it('is a div', () => {
        wrapper.name().should.equal('div');
      });
    });

    describe('Props', () => {
      it('renders the message at the top in a pre', () => {
        wrapper.setProps({ message: 'Hello' });
        wrapper.contains((
          <pre style={{ fontFamily: 'inherit' }}>Hello</pre>
        )).should.equal(true);
      });
    });
  });
}
