/* eslint-env mocha */
/* eslint-disable func-names, prefer-arrow-callback */

import React from 'react';
import { Meteor } from 'meteor/meteor';
import { shallow } from 'enzyme';
import { chai } from 'meteor/practicalmeteor:chai';

import FreeTextField from './FreeTextField.jsx';

if (Meteor.isClient) {
  describe('Free Text Field', () => {
    chai.should();

    it('should render a dropdown div', () => {
      const freeTextField = shallow(<FreeTextField />);
      freeTextField.hasClass('dropdown').should.equal(true);
    });

    it('should render a value button', () => {
      const freeTextField = shallow(<FreeTextField />);
      const valueButton = freeTextField.find('button.value');
      valueButton.hasClass('value').should.equal(true);
    });

    it('should display the value in the button when there is no unit', () => {
      const props = { value: 'value', valueUpdateCallback: () => null };
      const freeTextField = shallow(<FreeTextField {...props} />);
      const valueButton = freeTextField.find('button.value');
      valueButton.childAt(0).getNode().should.be.a('string');
      valueButton.childAt(0).getNode().should.equal('value');
    });

    it('should display the value and unit in the button when there is a unit', () => {
      const props = { value: 'value', unit: 'unit' };
      const freeTextField = shallow(<FreeTextField {...props} />);
      const valueButton = freeTextField.find('button.value');
      valueButton.childAt(0).getNode().should.be.a('string');
      valueButton.childAt(0).getNode().should.equal('value unit');
    });

    it('should have the align-right class on the value button when the alignRight prop is true', () => {
      const props = { alignRight: true };
      const freeTextField = shallow(<FreeTextField {...props} />);
      const valueButton = freeTextField.find('button.value');
      valueButton.hasClass('align-right').should.equal(true);
    });

    it('should open the dropdown menu when the value button is clicked', () => {
      const freeTextField = shallow(<FreeTextField />);
      const valueButton = freeTextField.find('button.value');
      valueButton.simulate('click');
    });
  });
}
