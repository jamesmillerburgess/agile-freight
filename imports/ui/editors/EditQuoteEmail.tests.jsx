/* eslint-env mocha */
/* eslint-disable func-names, prefer-arrow-callback */

import React from 'react';
import { Meteor } from 'meteor/meteor';
import StubCollections from 'meteor/hwillson:stub-collections';
import { mount } from 'enzyme';
import { chai } from 'meteor/practicalmeteor:chai';

import EditQuoteEmail from './EditQuoteEmail.jsx';

import { Quotes } from '../../api/quotes/quotesCollection';

// Stub the method that is used in the component
Meteor.methods({ 'email.send': () => null });

if (Meteor.isClient) {
  describe('EditQuoteEmail Component', () => {
    chai.should();

    let countOnLoad;
    let countSetEmailTo;
    let countSetEmailCC;
    let countSetEmailSubject;
    let countSetEmailMessage;
    const props = {
      quote: {
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
        email: {
          isOpen: false,
          to: '',
          cc: '',
          subject: '',
          message: '',
        },
      },
      dispatchers: {
        onLoad: () => {
          countOnLoad += 1;
        },
        setEmailTo: () => {
          countSetEmailTo += 1;
        },
        setEmailCC: () => {
          countSetEmailCC += 1;
        },
        setEmailSubject: () => {
          countSetEmailSubject += 1;
        },
        setEmailMessage: () => {
          countSetEmailMessage += 1;
        },
      },
      history: {},
      match: { params: { quoteId: 'a' } },
    };

    const store = {
      subscribe: () => null,
      dispatch: () => null,
      getState: () => state,
    };

    const options = {
      context: { store },
      childContextTypes: { store: React.PropTypes.object.isRequired },
    };

    let wrapper;
    beforeEach(() => {
      StubCollections.stub(Quotes);
      Quotes.insert({ _id: 'a' });
      countOnLoad = 0;
      countSetEmailTo = 0;
      countSetEmailCC = 0;
      countSetEmailSubject = 0;
      countSetEmailMessage = 0;
      wrapper = mount(<EditQuoteEmail {...props} />, options);
    });

    afterEach(() => {
      wrapper.unmount();
      StubCollections.restore();
    });

    it('renders a component', () => {
      wrapper.exists().should.equal(true);
    });

    it('loads a quote into the store before mounting', () => {
      countOnLoad.should.equal(1);
    });

    it('defaults the to value into the to input', () => {
      wrapper.setProps({ quote: { email: { ...props.quote.email, to: 'a' } } });
      wrapper.find('#to').prop('value').should.equal('a');
    });

    it('defaults the cc value into the cc input', () => {
      wrapper.setProps({ quote: { email: { ...props.quote.email, cc: 'a' } } });
      wrapper.find('#cc').prop('value').should.equal('a');
    });

    it('defaults the subject value into the subject input', () => {
      wrapper.setProps({
        quote: { email: { ...props.quote.email, subject: 'a' } },
      });
      wrapper.find('#subject').prop('value').should.equal('a');
    });

    it('defaults the message value into the message input', () => {
      wrapper.setProps({
        quote: { email: { ...props.quote.email, message: 'a' } },
      });
      wrapper.find('#message').prop('value').should.equal('a');
    });

    it('should fire setEmailTo when to input changes', () => {
      countSetEmailTo.should.equal(0);
      wrapper.find('#to').simulate('change', { target: { value: 'a' } });
      countSetEmailTo.should.equal(1);
    });

    it('should fire setEmailCC when cc input changes', () => {
      countSetEmailCC.should.equal(0);
      wrapper.find('#cc').simulate('change', { target: { value: 'a' } });
      countSetEmailCC.should.equal(1);
    });

    it('should fire setEmailSubject when subject input changes', () => {
      countSetEmailSubject.should.equal(0);
      wrapper.find('#subject').simulate('change', { target: { value: 'a' } });
      countSetEmailSubject.should.equal(1);
    });

    it('should fire setEmailMessage when message input changes', () => {
      countSetEmailMessage.should.equal(0);
      wrapper.find('#message').simulate('change', { target: { value: 'a' } });
      countSetEmailMessage.should.equal(1);
    });
  });
}
