/* eslint-env mocha */
/* eslint-disable func-names, prefer-arrow-callback */

import React from 'react';
import { Meteor } from 'meteor/meteor';
import { shallow } from 'enzyme';
import { chai } from 'meteor/practicalmeteor:chai';

import CurrencyField from './CurrencyField.jsx';

import { APIGlobals } from '../../api/api-globals';

if (Meteor.isClient) {
  chai.should();
  describe('CurrencyField Component', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = shallow(<CurrencyField />);
    });
    afterEach(() => {
      wrapper.unmount();
    });

    describe('Outer Structure', () => {
      it('renders a component', () => {
        wrapper.exists().should.equal(true);
      });

      it('renders a Select component in the outermost div', () => {
        wrapper.name().should.equal('Select');
      });
    });

    describe('Props', () => {
      it('passes the className prop as the className prop on the Select', () => {
        wrapper.setProps({ className: 'class' });
        wrapper.hasClass('class').should.equal(true);
      });

      it('defaults an empty string as the className prop on the Select', () => {
        wrapper.props().className.should.equal('');
      });

      it('passes the value prop as the value prop on the Select', () => {
        wrapper.setProps({ value: 'value' });
        wrapper.props().value.should.equal('value');
      });

      it('defaults an empty string as the value prop on the Select', () => {
        wrapper.props().value.should.equal('');
      });

      it('passes the onChange prop as the onChange prop on the Select', () => {
        const onChange = () => null;
        wrapper.setProps({ onChange });
        wrapper.props().onChange.should.equal(onChange);
      });

      it('defaults noop as the onChange prop on the Select', () => {
        wrapper.props().onChange.should.equal(APIGlobals.noop);
      });

      it('is not clearable', () => {
        wrapper.props().clearable.should.equal(false);
      });

      it('is searchable', () => {
        wrapper.props().searchable.should.equal(true);
      });

      it('does not render an arrow', () => {
        wrapper.props().arrowRenderer.should.equal(APIGlobals.noop);
      });

      it('defaults the global currencies as the options prop on the select', () => {
        wrapper.props().options.should.equal(APIGlobals.currencyOptions);
      });
    });
  });
}
