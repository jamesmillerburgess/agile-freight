/* eslint-env mocha */
/* eslint-disable func-names, prefer-arrow-callback */

import React from 'react';
import { Meteor } from 'meteor/meteor';
import { mount } from 'enzyme';
import { chai } from 'meteor/practicalmeteor:chai';

import EditQuoteEmail from './EditQuoteEmail.jsx';

// Stub the method that is used in the component
Meteor.methods({ 'email.send': () => null });

if (Meteor.isClient) {
  describe('EditQuoteEmail Component', () => {
    chai.should();

    const state = {
      newQuote: {
        cargo: {},
        movement: {},
        charges: {
          chargeLines: [],
          currency: '',
          totalOriginCharges: 0,
          totalInternationalCharges: 0,
          totalDestinationCharges: 0,
          totalCharges: 0,
        },
      },
      email: {
        isOpen: false,
        to: '',
        cc: '',
        subject: '',
        message: '',
      },
    };

    const store = {
      subscribe: () => {
      },
      dispatch: () => {
      },
      getState: () => state,
    };

    const options = {
      context: { store },
      childContextTypes: { store: React.PropTypes.object.isRequired },
    };

    it('renders a component', () => {
      const editQuoteEmail = mount(<EditQuoteEmail />, options);

      editQuoteEmail.exists().should.equal(true);
      editQuoteEmail.unmount();
    });

    it('defaults the to value into the to input', () => {
      const editQuoteEmail = mount(<EditQuoteEmail to="a" />, options);

      editQuoteEmail.find('#to').prop('value').should.equal('a');
      editQuoteEmail.unmount();
    });

    it('defaults the cc value into the cc input', () => {
      const editQuoteEmail = mount(<EditQuoteEmail cc="a" />, options);

      editQuoteEmail.find('#cc').prop('value').should.equal('a');
      editQuoteEmail.unmount();
    });

    it('defaults the subject value into the subject input', () => {
      const editQuoteEmail = mount(<EditQuoteEmail subject="a" />, options);

      editQuoteEmail.find('#subject').prop('value').should.equal('a');
      editQuoteEmail.unmount();
    });

    it('defaults the message value into the message input', () => {
      const editQuoteEmail = mount(<EditQuoteEmail message="a" />, options);

      editQuoteEmail.find('#message').prop('value').should.equal('a');
      editQuoteEmail.unmount();
    });

    it('defaults the currency value into the various totals', () => {
      const editQuoteEmail = mount(<EditQuoteEmail charges={{ currency: 'a' }} />, options);

      editQuoteEmail.find('#origin-subtotal').text().split(' ')[0].should.equal('a');
      editQuoteEmail.find('#international-subtotal').text().split(' ')[0].should.equal('a');
      editQuoteEmail.find('#destination-subtotal').text().split(' ')[0].should.equal('a');
      editQuoteEmail.find('#total').text().split(' ')[0].should.equal('a');
      editQuoteEmail.unmount();
    });

    it('defaults the various subtotals with currency formatting into their cells', () => {
      const charges        = {
        totalOriginCharges: 1,
        totalInternationalCharges: 2,
        totalDestinationCharges: 3,
        totalCharges: 4,
      };
      const editQuoteEmail = mount(<EditQuoteEmail charges={charges} />, options);

      editQuoteEmail.find('#origin-subtotal').text().split(' ')[1].should.equal('1.00');
      editQuoteEmail.find('#international-subtotal').text().split(' ')[1].should.equal('2.00');
      editQuoteEmail.find('#destination-subtotal').text().split(' ')[1].should.equal('3.00');
      editQuoteEmail.find('#total').text().split(' ')[1].should.equal('4.00');
    });

    it('should fire setEmailTo when to input changes', () => {
      let count = 0;
      const setEmailTo = () => {
        count += 1;
      };
      const editQuoteEmail = mount(<EditQuoteEmail setEmailTo={setEmailTo} />, options);

      count.should.equal(0);
      editQuoteEmail.find('#to').simulate('change', { target: { value: 'a' } });
      count.should.equal(1);
      editQuoteEmail.unmount();
    });

    it('should fire setEmailCC when cc input changes', () => {
      let count = 0;
      const setEmailCC     = () => {
        count += 1;
      };
      const editQuoteEmail = mount(<EditQuoteEmail setEmailCC={setEmailCC} />, options);

      count.should.equal(0);
      editQuoteEmail.find('#cc').simulate('change', { target: { value: 'a' } });
      count.should.equal(1);
      editQuoteEmail.unmount();
    });

    it('should fire setEmailSubject when subject input changes', () => {
      let count = 0;
      const setEmailSubject = () => {
        count += 1;
      };
      const editQuoteEmail = mount(<EditQuoteEmail setEmailSubject={setEmailSubject} />, options);

      count.should.equal(0);
      editQuoteEmail.find('#subject').simulate('change', { target: { value: 'a' } });
      count.should.equal(1);
      editQuoteEmail.unmount();
    });

    it('should fire setEmailMessage when message input changes', () => {
      let count = 0;
      const setEmailMessage = () => {
        count += 1;
      };
      const editQuoteEmail = mount(<EditQuoteEmail setEmailMessage={setEmailMessage} />, options);

      count.should.equal(0);
      editQuoteEmail.find('#message').simulate('change', { target: { value: 'a' } });
      count.should.equal(1);
      editQuoteEmail.unmount();
    });

    it('should fire setEmailIsOpen when the send button is clicked', () => {
      let count = 0;
      const setEmailIsOpen = () => {
        count += 1;
      };
      const editQuoteEmail = mount(<EditQuoteEmail setEmailIsOpen={setEmailIsOpen} />, options);

      count.should.equal(0);
      editQuoteEmail.find('#send-email-button').simulate('click');
      count.should.equal(1);
      editQuoteEmail.unmount();
    });
  });
}
